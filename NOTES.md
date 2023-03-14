
### Custom type import  

---

In types/prismic-types.generated.ts or .slicemachine/prismicio.d.ts

```javascript
import type * as prismicT from "@prismicio/types";
// import type * as prismic from "@prismicio/client";
import CustomTypesClient from "@prismicio/custom-types-client/dist/index";
import {CustomTypesClientConfig} from "@prismicio/custom-types-client";

declare module "@prismicio/client" { interface CreateClient {
(repositoryNameOrEndpoint?: string, options?: CustomTypesClientConfig): typeof CustomTypesClient;
}
    namespace Content {
        export type { MainMenuDocumentData, MainMenuDocumentDataLinkItem, MainMenuDocument, PageDocumentData, PageDocumentDataTagsItem, PageDocumentDataSlicesSlice, PageDocument, SettingsDocumentData, SettingsDocumentDataSocialsItem, SettingsDocument, AllDocumentTypes, LoadingImageSliceDefaultItem, LoadingImageSliceDefault, LoadingImageSliceVariation, LoadingImageSlice, SketchBookSliceDefaultPrimary, SketchBookSliceDefault, SketchBookSliceVariation, SketchBookSlice, SocialsSliceDefaultItem, SocialsSliceDefault, SocialsSliceVariation, SocialsSlice };
    }
}
```

---
