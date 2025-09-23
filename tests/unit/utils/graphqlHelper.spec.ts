/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2017, 2018                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

import { GraphQLEnumType, GraphQLObjectType } from 'graphql';
import * as schema from '../../../src/server/models/calendar';
import * as graphqlHelper from '../../../src/server/utils/graphqlHelper';
import { buildGraphqlSchema } from '../../../src/server/utils/graphqlLoopbackUtils';
import rewire = require('rewire');

const rewiredGraphqlHelper = rewire('../../../src/server/utils/graphqlHelper');
const convertSchemaPropsToGraphQLFields = rewiredGraphqlHelper.__get__('convertSchemaPropsToGraphQLFields');
const capitalize = rewiredGraphqlHelper.__get__('capitalize');

describe('GraphQL Helper', () => {
  describe('toGraphQLEnumType()', () => {
    const mockEnumName = 'TestEnum';
    const mockEnumValues = ['just', 'a', 'test'];
    const mockEnumDescription = 'This is a test';
    const graphQlEnumType = graphqlHelper.toGraphQLEnumType(mockEnumName, mockEnumValues, mockEnumDescription);

    it('should return a GraphQLEnumType object', () => {
        expect(graphQlEnumType instanceof GraphQLEnumType).toBe(true);
    });

    it('should set the name and description of the returned GraphQLEnumType object to the ones provided in input', () => {
      expect(graphQlEnumType.name).toBe(mockEnumName);
      expect(graphQlEnumType.description).toBe(mockEnumDescription);
    });
  });

  describe('convertSchemaPropsToGraphQLFields()', () => {
    it('should return an object containing one field with \'type\' attribute per each input schema property', () => {
      const props = schema.CalendarItem.properties;
      const fields = convertSchemaPropsToGraphQLFields(schema.CalendarItem);
      for (const prop in props) {
        if (props.hasOwnProperty(prop)) {
          expect(typeof fields[prop].type === 'object').toBe(true);
        }
      }
    });
  });

  describe('toGraphQLObjectType()', () => {
    it('should return a GraphQLObjectType object', () => {
      const mockObjectName = 'TestObject';
      const _schema = schema.CalendarItem;
      const graphQLObjectType = graphqlHelper.toGraphQLObjectType(mockObjectName, _schema);
      expect(graphQLObjectType instanceof GraphQLObjectType).toBe(true);
    });
  });

  describe('capitalize()', () => {
    it('should return the argument unmodified if it\'s not a string', () => {
      expect(capitalize({ hello: 'there' })).toEqual({ hello: 'there' });
    });
    it('should return the empty string if argument is the empty string', () => {
      expect(capitalize('')).toBe('');
    });
    it('should return the string in input with the first charecter transformed to upper case', () => {
      expect(capitalize('ciao')).toBe('Ciao');
    });
  });

  describe('Dynamic Graphql schema generation', () => {

    const loopbackSchema = {
      TourData:
      { jitSeen:
        { type: ['string'],
          description: 'list of stored tour ID\'s seen',
          required: true },
        whatsNewSeen:
        { type: ['string'],
          description: 'list of stored tour ID\'s to be seen',
          required: true },
        lastGuidedTourTime:
        { type: 'String',
          description: 'The last time a tour was accessed',
          required: true },
          _description: 'Tour data' },
      OrientMe:
        { tour_data:
          { type: 'TourData',
            description: 'Tour data preference data',
            required: false },
          _description: 'Orient me application' },
      ApplicationList:
        { orient_me:
          { type: 'OrientMe',
            description: 'Orient me application',
            required: false },
          _description: 'User application list' },
      User:
        { extId: { type: 'string', required: true, description: 'id of the user' },
          orgId:
          { type: 'string',
            required: true,
            description: 'id of the organization' },
          prof_key: { type: 'string', description: 'prof_key' },
          applications: { type: 'ApplicationList', description: 'Application list' },
          _description: 'User details' },
      };

    const OrientQueryType = {
      name: 'orientQueryType',
      fields: {}
    };
    const statusMutationType = {
      name: 'statusMutationType',
      fields: {}
    };

    it('Build schema unit test', () => {
      buildGraphqlSchema(loopbackSchema, OrientQueryType, statusMutationType);
      expect(OrientQueryType.fields['userprefs']).toEqual(jasmine.any(Object));
      expect(OrientQueryType.fields['userprefs'].type).toEqual(jasmine.any(Object));
      expect(statusMutationType.fields['userprefsModify']).toEqual(jasmine.any(Object));
      expect(statusMutationType.fields['userprefsModify'].type).toEqual(jasmine.any(Object));
      expect(statusMutationType.fields['userprefsModify'].args).toEqual(jasmine.any(Object));
    });

    it('Build schema unit test covering the recursion part', () => {
      const tourDataTemp = Object.assign({}, loopbackSchema.TourData);
      delete loopbackSchema.TourData;
      loopbackSchema['TourData'] = tourDataTemp;
      buildGraphqlSchema(loopbackSchema, OrientQueryType, statusMutationType);
      expect(OrientQueryType.fields['userprefs']).toEqual(jasmine.any(Object));
      expect(OrientQueryType.fields['userprefs'].type).toEqual(jasmine.any(Object));
      expect(statusMutationType.fields['userprefsModify']).toEqual(jasmine.any(Object));
      expect(statusMutationType.fields['userprefsModify'].type).toEqual(jasmine.any(Object));
      expect(statusMutationType.fields['userprefsModify'].args).toEqual(jasmine.any(Object));
    });
  });
});
