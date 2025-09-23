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
  GraphQLEnumType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

const SANITATION_REGEX = /[+*?^=<>|\-\\'"&\/]/gi;

const TypeMap = {
  array:   GraphQLList,
  boolean: GraphQLBoolean,
  date:    GraphQLString,
  string:  GraphQLString,
  number:  GraphQLInt,
};

export function formatParamsHandler(params) {
  params.operationName = params.operationName ? params.operationName.replace(SANITATION_REGEX, '') : params.operationName;
  params.query = params.query.replace(SANITATION_REGEX, '');
  return params;
}

export function toGraphQLEnumType(name: string, _values: any[], description?: string): GraphQLEnumType {
  const values: any = {};
  for (const value of _values) {
    values[value] = {};
  }
  return new GraphQLEnumType({
    name,
    description,
    values
  });
}

function capitalize(str: string): string {
  if (typeof str !== 'string' || str.length < 1) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function convertSchemaPropsToGraphQLFields(schema, overriddenTypes?): any {
  const fields: any = {};
  const properties = schema.properties;
  for (const prop in properties) {
    if (properties.hasOwnProperty(prop)) {
      let type = TypeMap[properties[prop].type];
      if (overriddenTypes && overriddenTypes[prop]) {
        type = overriddenTypes[prop];
      } else if (properties[prop].type === 'object') {
        const typeName = capitalize(prop);
        type = toGraphQLObjectType(typeName, properties[prop]);
      }
      fields[prop] = { type };
    }
  }
  return fields;
}

export function toGraphQLObjectType(name: string, schema, overriddenTypes?, description?: string): GraphQLObjectType {
  const fields = convertSchemaPropsToGraphQLFields(schema, overriddenTypes);
  return new GraphQLObjectType({
    name,
    description,
    fields
  });
}
