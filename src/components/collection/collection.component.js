import React from "react";
import { Select, Spinner } from "@chakra-ui/react";

import CollectionItem from "../collection-item/collection-item.component";
import "./collection.styles.scss";

const Collection = ({ isLoading, collection }) => {
  if (!collection || !collection.collection) {
    return (
      <div className="load-items-spinner">
        <span>loading...</span>
        <Spinner size="xl" />
      </div>
    );
  }
  return (
    <div className="collection">
      <div className="collection__items">
        {collection.items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
      {isLoading && (
        <div className="load-more-spinner">
          <Spinner size="xl" />
        </div>
      )}
    </div>
  );
};

export default Collection;
