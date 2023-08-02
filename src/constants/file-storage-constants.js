const LOCAL_STORAGE_FILE_PREFIX = 'local';
const LOCAL_USER_AVATARS_PATH = 'assets/avatars';
const CLOUD_STORAGE_FILE_PREFIX = 's3';
const CLOUD_STORAGE_PROTOCOL = 'https://';
const CLOUD_STORAGE_DOMAIN = '.s3.eu-west-2.amazonaws.com';
const USER_AVATARS_S3_BUCKET = 'spring-library-user-avatars';
const CLOUD_STORAGE_USER_AVATARS_PATH = `${CLOUD_STORAGE_PROTOCOL}${USER_AVATARS_S3_BUCKET}${CLOUD_STORAGE_DOMAIN}`;

export const FileStorageConstants = {
	LOCAL_STORAGE_FILE_PREFIX: LOCAL_STORAGE_FILE_PREFIX,
	LOCAL_USER_AVATARS_PATH: LOCAL_USER_AVATARS_PATH,
	CLOUD_STORAGE_FILE_PREFIX: CLOUD_STORAGE_FILE_PREFIX,
	USER_AVATARS_S3_BUCKET: USER_AVATARS_S3_BUCKET,
	CLOUD_STORAGE_USER_AVATARS_PATH: CLOUD_STORAGE_USER_AVATARS_PATH,
}
