import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

// ------------------------------ COMPONENTS ------------------------------
export const StyledButton = styled.button`
    background-color: ${props => props.theme.colors.main};
    color: white;
    border-radius: 40px;
    padding: 10px 15px;
    align-self: center;
`

export const StyledReactMarkdown = styled(ReactMarkdown)<{ $textColor?: string; }>`
    margin-bottom: 10px;

    p, li, blockquote, h1{
        word-wrap: break-word;
    }

    p, li, blockquote{
        color: ${props => props.$textColor || "#000"};
    }

    ol{
        list-style: auto;
    }

    ul{
        list-style: disc;
    }

    ol, ul{
        padding-left: 20px;
    }

    h1, h2, h3, h4, h5, h6{
        font-weight: 600;
        font-size: 20px;
        color: ${props => props.theme.colors.main};
    }

    a{
        text-decoration: underline;
        color: ${props => props.theme.colors.main};
    }

    blockquote{
        quotes: auto;
        display: inline-block;
        font-style: italic;
    }

    blockquote::before {
        content: open-quote;
    }

    blockquote::after {
        content: close-quote;
    }
`

export const StyledRecipeButtonWrapper = styled.div<{$padding: string}>`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    gap: 8px;
    border-bottom-left-radius: 0.75rem;
    background-color: #fff;
    padding: ${props => props.$padding};
`

// ------------------------------ FORM COMPONENTS ------------------------------
export const StyledFormHeader = styled.h2`
    text-align: center;
    font-weight: 700;
    font-size: 20px;
`

// ------------------------------ NAV COMPONENTS ------------------------------
export const StyledNavigation = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;
    gap: 0.75rem;
    padding: 0 20px;
    background-color: #fff;
    height: ${props => props.theme.values.navHeight};
`
export const StyledNavLink = styled(Link)<{$isActive: boolean}>`
    color: ${props => props.$isActive ? props.theme.colors.main : 'black'};
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
`

// ------------------------------ LAYOUT COMPONENTS ------------------------------
export const StyledLayout = styled.div`
    position: relative;
    min-height: calc(100vh - ${props => props.theme.values.navHeight});
    padding: 24px;
    background-color: ${props => props.theme.colors.page_bg};
`

// ------------------------------ LOADING COMPONENTS ------------------------------
export const StyledLoaderWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

// ------------------------------ RECIPE PAGE COMPONENTS ------------------------------
export const StyledTitle = styled.h2`
    color: ${props => props.theme.colors.main};
    font-weight: 500;
    font-size: 40px;
    display: flex;
    align-items: center;
    gap: 15px;
    overflow-wrap: anywhere;
`

export const StyledMealType = styled.span`
    background-color: ${props => props.theme.colors.main};
    border-radius: 20px;
    color: white; 
    text-transform: lowercase;
    font-size: 16px;
    padding: 3px 10px;
    text-align: center;
`

export const StyledNoImage = styled.div`
    width: 300px;
    height: 300px;
    float: right;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.no_image_bg};
    border-radius: 1rem;
    margin: 0 0 30px 30px;
`

export const StyledHeading = styled.h3`
    font-size: 26px;
    font-weight: 600; 
`