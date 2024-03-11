import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

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

    h1{
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

export const StyledButton = styled.button`
    background-color: ${props => props.theme.colors.main};
    color: white;
    border-radius: 40px;
    padding: 10px 15px;
    align-self: center;
`

export const StyledFormHeader = styled.h2`
    text-align: center;
    font-weight: 700;
    font-size: 20px;
`