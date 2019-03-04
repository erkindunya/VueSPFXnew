import Vue from 'vue';

import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './VueJSenverWebPart.module.scss';
import * as strings from 'VueJSenverWebPartStrings';

export interface IVueJSenverWebPartProps {
  description: string;
}

export default class VueJSenverWebPart extends BaseClientSideWebPart<IVueJSenverWebPartProps> {
  public data: IVueJSenverWebPartProps;
  public render(): void {
    this.domElement.innerHTML = `
    <div id="app-${this.context.instanceId}">
      <h1>{{description}}</h1>
    </div>`;

  this.data = {
    description: this.properties.description,
  };

  new Vue({
    el: `#app-${this.context.instanceId}`,
    data: this.data
  });
}

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
