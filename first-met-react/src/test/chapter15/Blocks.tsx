import styled from "styled-components";
import { Chapter15Props } from "./types";

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: lightgrey;
`;

const Block = styled.div<Chapter15Props>`
  border: 1px solid black;
  border-radius: 1rem;
  background-color: ${(props: Chapter15Props) => props.backgroundColor};
  padding: ${(props: Chapter15Props) => props.padding};
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

const blockItems = [
  {
    label: "1",
    padding: "1rem",
    backgroundColor: "red",
  },
  {
    label: "2",
    padding: "3rem",
    backgroundColor: "green",
  },
  {
    label: "3",
    padding: "2rem",
    backgroundColor: "blue",
  },
];

const Blocks = () => {
  return (
    <Wrapper>
      {blockItems.map((blockItem) => {
        return (
          <Block
            padding={blockItem.padding}
            backgroundColor={blockItem.backgroundColor}>
            {blockItem.label}
          </Block>
        );
      })}
    </Wrapper>
  );
};

export default Blocks;
