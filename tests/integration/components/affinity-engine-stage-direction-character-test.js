import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { initialize as initializeHook } from 'ember-hook';
import { initializeQUnitAssertions } from 'ember-message-bus';
import { initialize as initializeDirector } from 'affinity-engine-stage';
import { deepStub } from 'affinity-engine';
import { hook } from 'ember-hook';

const {
  getOwner,
  getProperties,
  setProperties
} = Ember;

moduleForComponent('affinity-engine-stage-direction-character', 'Integration | Component | ember engine stage character', {
  integration: true,

  beforeEach() {
    const appInstance = getOwner(this);

    initializeHook();
    initializeQUnitAssertions(appInstance);
    initializeDirector(appInstance);
  }
});

const configurationTiers = [
  'directable.attrs',
  'directable.attrs.fixture',
  'config.attrs.stage.character',
  'config.attrs.globals'
];

configurationTiers.forEach((priority) => {
  test(`height style is defined in ${priority}`, function(assert) {
    assert.expect(1);

    const stub = deepStub(priority, 'height', 63);

    setProperties(this, getProperties(stub, 'config', 'directable'));

    this.render(hbs`{{affinity-engine-stage-direction-character directable=directable config=config engineId="foo" windowId="bar"}}`);

    assert.equal(this.$(hook('affinity_engine_stage_direction_character')).attr('style'), 'height: 63%; ', 'height is set correctly');
  });
});