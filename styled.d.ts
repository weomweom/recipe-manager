import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            main: string;
            no_image_bg: string;
        };
    }
}