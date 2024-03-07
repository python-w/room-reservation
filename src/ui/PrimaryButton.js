import styled from "styled-components";

const StyledButton = styled.button`
    background: #0E53A8;
    color: #fff;
    border-radius: 100px;
    padding: 0 15px;
    height: 56px;
    border: 0;
`

const PrimaryButton = ({ props, children }) => {
    return (
        <StyledButton {...props}>{children}</StyledButton>
    )
}

export default PrimaryButton;