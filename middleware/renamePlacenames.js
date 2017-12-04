'use strict';

const _ = require('lodash');

const PARENT_PROPS = require('../helper/placeTypes');

const ADDRESS_PROPS = [
  { name: 'number', newName: 'housenumber' },
  { name: 'zip',    newName: 'postalcode', transform: (value) => { return [value]; } },
  { name: 'street', newName: 'street' },
  { name: 'pam_address_category_id',      newName: 'pam_address_category_id' },
  { name: 'pam_address_category',         newName: 'pam_address_category' },
  { name: 'pam_active_from',              newName: 'pam_active_from' },
  { name: 'pam_active_to',                newName: 'pam_active_to' },
  { name: 'pam_household_type_id',        newName: 'pam_household_type_id' },
  { name: 'pam_household_type',           newName: 'pam_household_type' },
  { name: 'pam_is_internally_created',    newName: 'pam_is_internally_created' },
  { name: 'pam_danish_pain',              newName: 'pam_danish_pain' },
  { name: 'pam_mod_adresse_adresse_idnr', newName: 'pam_mod_adresse_adresse_idnr' },
  { name: 'pam_lantmat_uuid',             newName: 'pam_lantmat_uuid' },
  { name: 'pam_norwegian_adress_id',      newName: 'pam_norwegian_adress_id' }
];


function setup() {
  return renamePlacenames;
}

function renamePlacenames(req, res, next) {
  // do nothing if no result data set
  if (!res || !res.data) {
    return next();
  }

  res.data = res.data.map(renameOneRecord);

  next();
}

/*
 * Rename the fields in one record
 */
function renameOneRecord(place) {

  // merge the parent block into the top level object to flatten the structure
  // only copy the properties if they have values
  if (place.parent) {
    PARENT_PROPS.forEach( (prop) => {
      place[prop] = place.parent[prop];
      place[prop + '_a'] = place.parent[prop + '_a'];
      place[prop + '_gid'] = place.parent[prop + '_id'];
    });
  }

  // copy the address parts after parent hierarchy in order to prefer
  // the postalcode specified by the original source data
  if (place.address_parts) {
    ADDRESS_PROPS.forEach( (prop) => {
      renameAddressProperty(place, prop);
    });
  }

  return place;
}

function renameAddressProperty(place, prop) {
  if (!place.address_parts.hasOwnProperty(prop.name)) {
    return;
  }

  if (prop.hasOwnProperty('transform')) {
    place[prop.newName] = prop.transform(place.address_parts[prop.name]);
  }
  else {
    place[prop.newName] = place.address_parts[prop.name];
  }
}

module.exports = setup;
