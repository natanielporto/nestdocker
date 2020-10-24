import { EncryptionTransformer } from 'typeorm-encrypted';

export const MyCrypto = new EncryptionTransformer({
  key: `${process.env.DB_KEY}`,
  algorithm: 'aes-256-cbc',
  ivLength: 16,
  iv: 'ff5ac19190424b1d88f9419ef949ae00',
  // iv: `${process.env.DB_IV}`,
});
