var mapperConfig = {
  pamMap: {
    'county':                'region',
    'province':              'municipality',
    'subdistrict':           'municipality_district',
    'postalcode':            'post_code',
    'hamlet':                'village'
  },

  testInputMap: {
		'id': 'test',
		'gid': 'test',
		'layer': 'test',
		'source': 'test',
		'source_id': 'test',
		'name': 'test',
		'housenumber': 'test',
		'street': 'test',
		'postalcode': 'test',
		'confidence': 'test',
		'accuracy': 'test',
		'country': 'test',
		'country_a': 'test',
		'county': 'test',
		'locality': 'test',
		'label': 'test'
  },

  testExpectedMap: {
		'id': 'test',
		'gid': 'test',
		'layer': 'test',
		'source': 'test',
		'source_id': 'test',
		'name': 'test',
		'housenumber': 'test',
		'street': 'test',
		'confidence': 'test',
		'accuracy': 'test',
		'country': 'test',
		'country_a': 'test',
		'locality': 'test',
		'label': 'test',
		'post_code': 'test',
		'region': 'test'
  }
};

module.exports = mapperConfig;
