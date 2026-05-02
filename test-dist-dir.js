const isProd = process.env.NODE_ENV !== 'development';
const isServerOutput = process.env.OD_WEB_OUTPUT_MODE === 'server';
const shouldStaticExport = isProd && !isServerOutput;
console.log({ isProd, shouldStaticExport, DIST_DIR: isProd ? (shouldStaticExport ? 'out' : '.next') : '.next' });
