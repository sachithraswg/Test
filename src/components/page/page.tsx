import React from 'react';
import "./page.css";
import ExpandableSection from "../expandable-section/Expandable-Section";
import PortTemplate from "../port-template/Port-Template";
import TabMenu from "../tab-menu/TabMenu";
import { useState } from "react";
import greenCam from "./../../assets/green-video-camera.svg";
import { MenuDetails } from '../../models/MenuDetails';

interface PageState {
  activeMenu: MenuDetails;
}

const PageJS: React.FC<any> = () => {
  const [state, setState] = useState<PageState>({activeMenu: { title: "Details", icon: "fa-solid fa-circle-info" }});
  let menu: MenuDetails[] = [
    { title: "Filter", icon: "fa-solid fa-filter" },
    { title: "Details", icon: "fa-solid fa-circle-info" },
  ];

  function handleTab(selectedMenu: MenuDetails) {
    setState(prevState => ({...prevState, activeMenu: selectedMenu}) );
  }

  return (
    <div className="page">
      <TabMenu menu={menu} activeMenu={state.activeMenu} onActive={handleTab} />
      <div className="form">
        <div className="form-content">
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="catalogId">Catalog ID</label>
                </td>
                <td>
                  <input type="text" id="catalogId" name="catalogId" required />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="type">Type</label>
                </td>
                <td>
                  <input type="text" id="type" name="type" required />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="model">Model</label>
                </td>
                <td>
                  <input type="text" id="model" name="model" required />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="image-container">
          <span className="image">
            <img src={greenCam} alt={greenCam} />
          </span>
        </div>
      </div>
      <ExpandableSection title="Fields"></ExpandableSection>
      <ExpandableSection title="Port Template">
        <PortTemplate></PortTemplate>
      </ExpandableSection>
      <ExpandableSection title="Documents"></ExpandableSection>
    </div>
  );
}

export default PageJS;
