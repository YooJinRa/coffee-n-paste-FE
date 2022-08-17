import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalPortal = ({ children, closePortal }) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.getElementById("root-modal");
      ref.current = dom;
    }
    return () => {
      setMounted(false);
    };
  }, []);

  if (ref.current && mounted) {
    return createPortal(
      <StModalWrap className="modal">
        <div
          className="modal-background"
          role="presentation"
          onClick={closePortal}
        />
        <div className="modal-content">
          <div className="modal-content__main">{children}</div>
          <div className="modal-content__close" onClick={closePortal} />
        </div>
      </StModalWrap>,
      ref.current
    );
  }
  return null;
};

export default ModalPortal;


const StModalWrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;

  .modal-content {
    text-align: center;
  }
  .modal-content {
    position: relative;
    width: 100%; 
    height: 100%;
  }
  .modal-content__main {
    position: relative;
    height: auto;
    display: inline-block;
    z-index:3;
  }
  .modal-content__close {
    position:absolute;
    top: 0; left: 0;
    width: 100%; 
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.8)
    );
    z-index:2;
  }
`