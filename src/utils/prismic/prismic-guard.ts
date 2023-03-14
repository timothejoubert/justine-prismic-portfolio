import * as prismicT from "@prismicio/types";
import {FilledContentRelationshipField} from "@prismicio/types/src/value/contentRelationship";

export const isInternalLinkFulled = (link: prismicT.LinkField & { uid?: string } ): link is prismicT.LinkField & FilledContentRelationshipField => {
    return !!link?.uid
}
