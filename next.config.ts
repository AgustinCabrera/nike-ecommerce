import path from 'path';

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
        prependData: `@import "variables.scss";`,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'example.com',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'another-example.com',
                port: '',
                pathname: '**',
            },
        ],
    },
}

export default nextConfig;