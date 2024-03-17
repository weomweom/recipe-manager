import { ThreeDots } from "react-loader-spinner";
import { useTheme } from 'styled-components';
import { StyledLoaderWrapper } from "./StyledComponents";

function Loader() {
    const theme = useTheme()

    return (
        <StyledLoaderWrapper>
            <ThreeDots
                color={theme.colors.main}
            />
        </StyledLoaderWrapper>
    );
}

export default Loader;