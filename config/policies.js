/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  // Cards API
  'cards/list-cards': 'is-authenticated',
  'cards/get-card': 'is-authenticated',
  'cards/create-card': 'is-authenticated',
  'cards/update-card': 'is-authenticated',
  'cards/delete-card': 'is-authenticated',
  'cards/meta-data': 'is-authenticated',

  // Groups API
  'groups/list-groups': 'is-authenticated',

  // Users API
  'users/get-me': 'is-authenticated',
  'users/update-me': 'is-authenticated'

};
