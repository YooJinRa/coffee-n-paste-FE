import styled from 'styled-components';

function StyleTest() {
  return (
    <StStyleTestWrap>
      <h1>Coffee N Paste!!!</h1>
      <h2>스타벅스</h2>
      <p>일반 basic 글자!!!!</p>
      <ul>
        <li className='red'>--red-color</li>
        <li className='green'>--green-color</li>
        <li className='yellow'>--yellow-color</li>
        <li className='blue'>--blue-color</li>
        <li className='text'>--text-color</li>
      </ul>
    </StStyleTestWrap>
  );
}

export default StyleTest;

const StStyleTestWrap = styled.div`
  // border Setting
  ul li {
    width: 100px;
    height: 100px;
    margin: 10px;
    text-align: center;
    line-height: 100px;
    border: var(--border-style);
  }
  // Color Setting Test
  .red {
    background-color: var(--red-color);
  }
  .green {
    background-color: var(--green-color);
  }
  .yellow {
    background-color: var(--yellow-color);
  }
  .blue {
    background-color: var(--blue-color);
  }
  .text {
    color: var(--text-color);
    background-color: gray;
  }
`


