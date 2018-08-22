# FileCacheService

The purpose of the **FileCacheService** is to scan the storage bucket,
generating a list of all files and their relevant attributes.

This is done to enhance performance, as having to connect to and crawl the
bucket each time you want to interact with the stored files would be impossibly
slow.

## Configuration Settings

- `CACHE_DIRECTORY`: Should be set to the directory where the cache will be
  stored.

## Associated Files

- `cache/files-cache.json`
