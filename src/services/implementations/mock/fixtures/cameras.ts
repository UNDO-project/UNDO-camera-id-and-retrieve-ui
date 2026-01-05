import type { CameraRecord } from '@/primitives';

export const mockCameras: CameraRecord[] = [
  {
    cameraId: '1',
    modelName: 'AXIS M3045-V',
    displayName: 'Axis M3045-V Network Camera',
    description: 'Fixed mini dome with HDMI and HDTV 1080p.',
    vendor: 'Axis',
    category: 'Dome',
    productCategory: 'Network Cameras',
    productSeries: 'AXIS M30 Series',
    imageUrl:
      'https://www.axis.com/sites/axis/files/styles/standard_16_9_800x450/public/2020-03/m3045-v-white-no-mount-angle-left-1600x900-2003.png.webp',
    images: [
      'https://www.axis.com/sites/axis/files/styles/standard_16_9_800x450/public/2020-03/m3045-v-white-no-mount-angle-left-1600x900-2003.png.webp',
    ],
    datasheetUrl:
      'https://www.axis.com/dam/public/e6/5a/08/datasheet-axis-m3045-v-network-camera-en-US-407238.pdf',
    specifications: {
      resolution: '1920x1080',
      fov: '106 degrees',
      ipRating: 'IP42',
    },
    specificationsHtml: {},
  },
  {
    cameraId: '2',
    modelName: 'Hikvision DS-2CD2143G0-I',
    displayName: 'Hikvision 4MP Dome Camera',
    description: '4 MP Outdoor Fixed Dome Network Camera',
    vendor: 'Hikvision',
    category: 'Dome',
    productCategory: 'Network Cameras',
    productSeries: 'Pro Series',
    imageUrl:
      'https://www.hikvision.com/content/dam/hikvision/products/IP-Products/Network-Cameras/Pro-Series/EasyIP-2-0-Plus/DS-2CD2143G0-I/front.png',
    images: [],
    specifications: {
      resolution: '2688x1520',
      fov: '98 degrees',
      ipRating: 'IP67',
    },
    specificationsHtml: {},
  },
  {
    cameraId: '3',
    modelName: 'Hanwha XNV-6080',
    displayName: 'Wisenet XNV-6080',
    description: '2MP Network Vandal Dome Camera',
    vendor: 'Hanwha Vision',
    category: 'Dome',
    productCategory: 'Network Cameras',
    productSeries: 'X Series',
    images: [],
    specifications: {
      resolution: '1920x1080',
      fov: '112 degrees',
      ipRating: 'IP66',
    },
    specificationsHtml: {},
  },
];
