/**
  ## Overview

  In order to properly fetch and update data, EmberData
  needs to understand how to connect to your API.

  `Adapters` accept various kinds of requests from the store
  and manage fulfillment of the request from your API.

  ### Implementing an Adapter


  ### Adapter Resolution

  `store.adapterFor(name)` will lookup adapters defined in
  `app/adapters/` and return an instance. If no adapter is found, an
  error will be thrown.

  `adapterFor` first attempts to find an adapter with an exact match on `name`,
  then falls back to checking for the presence of an adapter named `application`.

  ```ts
  store.adapterFor('author');

  // lookup paths (in order) =>
  //   app/adapters/author.js
  //   app/adapters/application.js
  ```

  Most requests in EmberData are made with respect to a particular `type` (or `modelName`)
  (e.g., "get me the full collection of **books**" or "get me the **employee** whose id is 37"). We
  refer to this as the **primary** resource `type`.

  Typically `adapterFor` will be used to find an adapter with a name matching that of the primary
  resource `type` for the request, falling back to the `application` adapter for those types that
  do not have a defined adapter. This is often described as a `per-model` or `per-type` strategy
  for defining adapters. However, because APIs rarely define endpoints per-type but rather
  per-API-version, this may not be a desired strategy.

  It is recommended that applications define only a single `application` adapter and serializer
  where possible.

  If you have multiple APIs and the per-type strategy is not viable, one strategy is to
  write an `application` adapter and serializer that make use of `options` to specify the desired
  format when making a request.

  ### Using an Adapter

  Any adapter in `app/adapters/` can be looked up by `name` using `store.adapterFor(name)`.

  ### Default Adapters

  Applications whose API's structure endpoint URLs *very close to* or *exactly* the **REST**
  or **JSON:API** convention, the `@ember-data/adapter` package contains implementations
  these applications can extend.

  Many applications will find writing their own adapter to be allow greater flexibility,
  customization, and maintenance than attempting to override methods in these adapters.

  @module @ember-data/adapter
  @main @ember-data/adapter
  @public
*/

/**
  The following documentation describes the methods an
  adapter should implement with descriptions around when an
  application might expect these methods to be called.

  Methods that are not required are marked as **optional**.

  @module @ember-data/adapter
  @class MinimumAdapterInterface
  @public
*/
interface Adapter {
  findRecord();
  findAll();
  query();
  queryRecord();

  createRecord();
  updateRecord();
  deleteRecord();

  generateIdForRecord?();
  findMany?();
  groupRecordForFindMany?();
  shouldReloadRecord?();
  shouldReloadAll?();
  shouldBackgroundReloadRecord?();
  shouldBackgroundReloadAll?();

  coalesceFindRequests?: boolean;
}

export default Adapter;
