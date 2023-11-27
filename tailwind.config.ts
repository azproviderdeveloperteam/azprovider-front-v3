import type { Config } from 'tailwindcss'

function withOpacity(variableName){
    return ({ opacityValue }) =>{
      if(opacityValue !== undefined){
        return `rgba(var(${variableName}), ${opacityValue})`
      }else {
        return `rgba(var(${variableName}))`
      }
    }
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors : {
        primary :{
          green : {
            lg100: withOpacity("--color-az-lime-green-100") ,
            lg400: withOpacity("--color-az-lime-green-400"),
            sg900: withOpacity("--color-az-sea-green-900"),
            wgd: withOpacity("--color-az-winter-green-dream"),
            mg: withOpacity("--color-az-myrtle-green"),
            cb: withOpacity("--color-az-com-blue"),
            shg: withOpacity("--color-az-sheen-green"),
            tb: withOpacity("--color-az-teal-blue"),
          } ,
          purple : {
            600:withOpacity('--color-az-purple-600'),
            800:withOpacity('--color-az-purple-800'),
          },
          dark : {
            g:withOpacity('--color-az-dark-green'),
            b:withOpacity('--color-az-dark-blue'),
            p:withOpacity('--color-az-dark-purple'),
          }
        },
        secondary :{
          red :withOpacity('--color-az-red'),
          yellow :withOpacity('--color-az-yellow') ,
          peach :withOpacity('--color-az-peach')
        }
      },

    },
  },
  plugins: [],
}
export default config
