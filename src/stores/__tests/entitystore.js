import test from 'tape';
import {EntityStore} from '../entitystore';

test('store should load entities', t => {
  const store = new EntityStore();
  store.loadJson([
    {
      id: 1,
      name: "test1",
      x: 100,
      y: 100
    },
    {
      id: 2,
      name: "test2",
      x: 200,
      y: 200
    }
  ]);

  t.equal(store.entities.length, 2);
  t.equal(store.entities[0].id, 1);
  t.equal(store.entities[0].name, "test1");
  t.equal(store.entities[0].x, 100);
  t.equal(store.entities[0].y, 100);

  t.end();
});

test('store should add entity', t => {
  const store = new EntityStore();
  store.addEntity("Foo", 42, 0);

  t.equal(store.entities.length, 1);
  t.equal(isNaN(store.entities[0].id), false);
  t.equal(store.entities[0].name, "Foo");
  t.equal(store.entities[0].x, 42);
  t.equal(store.entities[0].y, 0);

  t.end();
});
