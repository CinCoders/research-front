import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SameTabLink = styled(Link)`
  align-content: left;
  color: #b83232;
  font-weight: 400;
  font-size: 0.78rem;
  letter-spacing: 0.017rem;
  text-transform: none;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    background-color: inherit;
  }
`;

export const NewTabLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #b83232;
  font-weight: 400;
  font-size: 0.78rem;
  letter-spacing: 0.017rem;
  text-transform: none;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    background-color: inherit;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  min-height: 1.3em;
  min-width: 1.8em;
  pointerEvents: none;
  display: block;
  margin-left: auto;
  margin-right: auto;
  }
`;
