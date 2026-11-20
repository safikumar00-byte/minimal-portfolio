"use client";

import rawManifest from "./brand-assets-manifest.json";

export type AssetCategory =
  | "all"
  | "logos"
  | "brand-identity"
  | "mockups"
  | "products"
  | "applications";

export type DisplayMode = "hero" | "card" | "detail" | "square";

export interface BrandAsset {
  id: string;
  filename: string;
  src: string;
  category: "logos" | "brand-identity" | "mockups" | "products" | "applications";
  subcategory: string;
  caption: string;
  width: number;
  height: number;
  aspectRatio: string;
  format: "PNG" | "JPEG" | "SVG" | "PDF" | string;
  sizeBytes: number;
  sizeFormatted: string;
  hasAlpha: boolean;
  displayMode: DisplayMode;
}

export interface BrandManifestFolder {
  id: string;
  folder: string;
  name: string;
  category: string;
  itemsCount: number;
  dateModified: string;
  size: string;
  tagColor: "green" | "gold" | "blue" | "purple" | "orange";
  previewImage: string;
  description: string;
  deliverables: string[];
  presentCategories: string[];
  assets: BrandAsset[];
  // Backwards compatibility with MacosFolderModal galleryImages
  galleryImages: { src: string; caption: string; category: string; displayMode: DisplayMode; width: number; height: number }[];
}

export interface BrandAssetManifest {
  version: string;
  lastUpdated: string;
  totalBrands: number;
  totalAssets: number;
  categories: { id: AssetCategory; label: string }[];
  brands: BrandManifestFolder[];
}

export const BRAND_MANIFEST: BrandAssetManifest = {
  ...rawManifest,
  categories: rawManifest.categories as { id: AssetCategory; label: string }[],
  brands: (rawManifest.brands as unknown as Omit<BrandManifestFolder, "galleryImages">[]).map((b) => ({
    ...b,
    tagColor: b.tagColor as "green" | "gold" | "blue" | "purple" | "orange",
    galleryImages: b.assets.map((a: BrandAsset) => ({
      src: a.src,
      caption: a.caption,
      category: a.category,
      displayMode: a.displayMode,
      width: a.width,
      height: a.height,
    })),
  })),
};

export const BRAND_FOLDERS: BrandManifestFolder[] = BRAND_MANIFEST.brands;

export function getBrandById(id: string): BrandManifestFolder | undefined {
  return BRAND_FOLDERS.find((b) => b.id === id);
}

export function getAssetsByCategory(
  brandId: string,
  category: AssetCategory
): BrandAsset[] {
  const brand = getBrandById(brandId);
  if (!brand) return [];
  if (category === "all") return brand.assets;
  return brand.assets.filter((a) => a.category === category);
}

export default BRAND_MANIFEST;
