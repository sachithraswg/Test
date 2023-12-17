import React, { ReactNode, useState } from 'react';
import './Expandable-Section.css';

interface ExpandableSectionProps {
  title: string,
  children?: ReactNode | string;
}

interface ExpandableSectionState {
  isExpanded: boolean
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({title, children = 'No Content Provided.'}) => {
  const [isExpanded, setExpanded] = useState<ExpandableSectionState>({isExpanded: false});

  const handleToggle = () => {
    setExpanded(prevState => ( {isExpanded: !prevState.isExpanded} ));
  }

  return (
    <>
      <div className="btn-header" onClick={handleToggle}>
        <span className="title"> {title} </span>
        <span className="circular-btn">
          <i className={isExpanded ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></i>
        </span>
      </div>
      {<div className="view-container" style={{display: isExpanded ? 'block': 'none'}}>
        {children}
      </div>}
    </>
  );
}

export default ExpandableSection;