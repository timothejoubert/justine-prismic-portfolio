### Prismic type in generated ts 

```` javascript
import CustomTypesClient from "@prismicio/custom-types-client/dist/index";
import {CustomTypesClientConfig} from "@prismicio/custom-types-client";
(repositoryNameOrEndpoint?: string, options?: CustomTypesClientConfig): typeof CustomTypesClient;
````


### TODO

* **(PrismicTypeModule)** import correctly client types _(ex: context.$prismic.api.query())_
* **(ProjectListing && About)**: set tags in store if not already exist
* **(Config)**: Set default page as Home (if no params go to => fetch uid === 'home-page')
* **(Nav && Config)**: Configure nested route 
* **(Data)**: Sync prismic-repo data with local
* **(Config)*: Add preview


https://github.com/prismicio/prismic-vue/issues/5#issuecomment-493795628
