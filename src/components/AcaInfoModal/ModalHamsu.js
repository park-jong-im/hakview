import { useState } from "react";
import { article_api } from "../../Api";

function ModalHamsu() {
    // 각 버튼에 대한 상태값과 모달 열기/닫기 함수를 각각 정의합니다.
    const [isAllModalOpen, setIsAllModalOpen] = useState(false);
    const [isSuheomModalOpen, setIsSuheomModalOpen] = useState(false);
    const [isLicenceModalOpen, setIsLicenceModalOpen] = useState(false);

    // 각 버튼에 대한 클릭 여부를 추적하는 상태를 추가합니다.
    const [allButtonClicked, setAllButtonClicked] = useState(false);
    const [suheomButtonClicked, setSuheomButtonClicked] = useState(false);
    const [licenceButtonClicked, setLicenceButtonClicked] = useState(false);

    const [tagSearch, setTagSearch] = useState([]);

    // 별도의 함수 정의
    const mainClick = async (tag1) => {
        const response = await article_api.searchtag1(tag1);
        setTagSearch(response.content);
        closeAllModal();// 모달 닫기 함수 호출
    };

    const suheomClick = async (tag2) => {
        const response = await article_api.searchtag2(tag2);
        setTagSearch(response.content);
        closeSuheomModal(); // 모달 닫기 함수 호출
    };

    // 별도의 함수 정의
    const licenceClick = async (tag3) => {
        const response = await article_api.searchtag3(tag3);
        setTagSearch(response.content);
        closeLicenceModal();
    };

    // 각 모달 열기 함수를 정의합니다.
    const openAllModal = () => {
        setIsAllModalOpen(true);
        setAllButtonClicked(true); // 버튼 클릭 여부를 true로 변경
    };

    const openSuheomModal = () => {
        setIsSuheomModalOpen(true);
        setSuheomButtonClicked(true); // 버튼 클릭 여부를 true로 변경
    };

    const openLicenceModal = () => {
        setIsLicenceModalOpen(true);
        setLicenceButtonClicked(true); // 버튼 클릭 여부를 true로 변경
    };

    // 각 모달 닫기 함수를 정의합니다.
    const closeAllModal = () => {
        setIsAllModalOpen(false);
        setAllButtonClicked(false); // 버튼 클릭 여부를 false로 변경
    };

    const closeSuheomModal = () => {
        setIsSuheomModalOpen(false);
        setSuheomButtonClicked(false); // 버튼 클릭 여부를 false로 변경
    };

    const closeLicenceModal = () => {
        setIsLicenceModalOpen(false);
        setLicenceButtonClicked(false); // 버튼 클릭 여부를 false로 변경
    };

    function handleMouseEnter(event) {
        event.target.style.backgroundColor = 'lightgray'; // 마우스를 요소 위로 올렸을 때 배경색 변경
    }

    function handleMouseLeave(event) {
        event.target.style.backgroundColor = 'initial'; // 마우스를 요소에서 벗어났을 때 원래 배경색으로 복원
    }
    return {
        isAllModalOpen,
        isSuheomModalOpen,
        isLicenceModalOpen,
        allButtonClicked,
        suheomButtonClicked,
        licenceButtonClicked,
        mainClick,
        suheomClick,
        licenceClick,
        openAllModal,
        openSuheomModal,
        openLicenceModal,
        closeAllModal,
        closeSuheomModal,
        closeLicenceModal,
        handleMouseEnter,
        handleMouseLeave,
        tagSearch
    }
};

export default ModalHamsu;