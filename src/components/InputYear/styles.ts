import styled from 'styled-components';

export const TextInputWrapper = styled.div`
  position: relative;
  width: 90px;
  // margin: 0.5rem;
  --accent-color: red;

  &:before,
  &:after {
    content: '';
    left: 0;
    right: 0;
    position: absolute;
    pointer-events: none;
    bottom: -1px;
    z-index: 4;
    width: 100%;
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      transform 250ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }

  &:before {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  &:focus-within:before {
    border-bottom: 1px solid var(--accent-color);
    transform: scaleX(1);
  }

  &:focus-within:after {
    border-bottom: 2px solid var(--accent-color);
    transform: scaleX(1);
  }

  &:after {
    transform: scaleX(0);
    will-change: transform;
    border-bottom: 2px solid var(--accent-color);
    border-bottom-color: var(--accent-color);
  }
`;

export const TextInput = styled.input`
  border-radius: 5px 5px 0px 0px;
  box-shadow: 0px 2px 5px rgb(35 35 35 / 30%);
  max-height: 36px;
  background-color: white;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 200ms;
  transition-property: background-color;
  color: black;
  font-size: 14px;
  font-weight: 500;
  padding: 12px;
  width: 100%;
  border-top: white;
  border-left: none;
  border-bottom: none;
  border-right: none;
  outline: none;

  &:focus,
  &:active {
    outline: none;
  }

  ${TextInputWrapper}:focus-within & {
    background-color: white;
  }

  ${TextInputWrapper}:focus-within &::placeholder {
    opacity: 0;
  }
`;
