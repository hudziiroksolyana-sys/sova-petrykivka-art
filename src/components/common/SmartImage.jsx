import { useState } from "react";

export default function SmartImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  decoding = "async",
  fetchPriority = "auto",
  onLoad,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = (event) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  const imageClassName = `${className}${className ? " " : ""}smart-image${isLoaded ? " is-loaded" : ""}`;

  return (
    <img
      src={src}
      alt={alt}
      className={imageClassName}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onLoad={handleLoad}
      {...props}
    />
  );
}
