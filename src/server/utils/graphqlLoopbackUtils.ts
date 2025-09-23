/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2018                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLSchema
  } from 'graphql';

const loopbackToGraphQLMap = {
    string: GraphQLString,
    array: new GraphQLList(GraphQLString)
};

function _createGraphqlFieldsFromModel(args: {
    fields,
    inputFields,
    propertyName: string,
    type,
    inputType,
    description: string
}) {
    const { fields, inputFields, propertyName, type, inputType, description } = args;
    fields[propertyName] = {
        type,
        description,
        name: type.name && type.name !== 'String' ? type.name : ''
    };
    inputFields[propertyName] = {
        type: inputType,
        description,
        name: inputType.name && inputType.name !== 'String' ? inputType.name : ''
    };
}

function _generateGraphqlObjectType(args: {
    graphQLObjects: {[k: string]: GraphQLObjectType | GraphQLInputObjectType},
    modelName: string,
    description: string,
    fields,
    inputFields
}) {
    const { graphQLObjects, modelName, description, fields, inputFields } = args;
    graphQLObjects[modelName] = new GraphQLObjectType({
        description,
        fields,
        name: modelName
    });
    if (modelName !== 'User') {
        graphQLObjects['Input' + modelName] = new GraphQLInputObjectType({
            description,
            fields: inputFields,
            name: 'Input' + modelName
        });
    }
}

function _createGraphQLObject(model, modelName: string, graphQLObjects, loopbackMap) {
    const description: string = model._description;
    const fields = {};
    const inputFields = {};
    for (const propertyName of Object.keys(model)) {
      const property = model[propertyName];
      if (!property.type) {
        continue;
      }
      let type;
      let inputType;
      const propertyTypeName: string = property.type.constructor.name === 'String' ? property.type.toLowerCase() : property.type.constructor.name.toLowerCase();
      if (!loopbackToGraphQLMap[propertyTypeName]) {
        type = !graphQLObjects[property.type] ?
          _createGraphQLObject(loopbackMap[property.type], property.type, graphQLObjects, loopbackMap) :
          graphQLObjects[property.type];
        inputType = graphQLObjects['Input' + property.type];
      } else {
        type = loopbackToGraphQLMap[propertyTypeName];
        inputType = type;
      }
      _createGraphqlFieldsFromModel({
          fields,
          inputFields,
          propertyName,
          type,
          inputType,
          description: property.description as string
        });
    }
    _generateGraphqlObjectType({
        graphQLObjects,
        modelName,
        description,
        fields,
        inputFields
    });
    return graphQLObjects[modelName];
  }

function _addUserprefsSchemaToConfigurationObject(configObject, User: GraphQLObjectType, description: string, inputArgs?) {

    const name = configObject.name.includes('Mutation') ? 'userprefsModify' : 'userprefs';

    configObject.fields[name] = {
        type: new GraphQLList(User),
        description
    };
    if (inputArgs) {
        configObject.fields[name].args = {
        applications: {
            type: inputArgs
        }
        };
    }
}

export function buildGraphqlSchema(loopbackMap, OrientQueryType, statusMutationType): GraphQLSchema {
    const graphQLObjects: {[k: string]: GraphQLObjectType | GraphQLInputObjectType} = {};
    for (const modelName of Object.keys(loopbackMap)) {
        _createGraphQLObject(loopbackMap[modelName], modelName, graphQLObjects, loopbackMap);
    }
    _addUserprefsSchemaToConfigurationObject(OrientQueryType,
        graphQLObjects.User as GraphQLObjectType,
        'Userprefs query type used to fetch preferences stored through the userprefs service');
    _addUserprefsSchemaToConfigurationObject(statusMutationType,
        graphQLObjects.User as GraphQLObjectType,
        'Userprefs query type used to fetch preferences stored through the userprefs service',
        graphQLObjects.InputApplicationList);

    return new GraphQLSchema({
        mutation: new GraphQLObjectType(statusMutationType),
        query: new GraphQLObjectType(OrientQueryType)
    });
}
