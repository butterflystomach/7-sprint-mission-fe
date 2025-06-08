import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tags: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("상품 등록 데이터:", formData);

      // 성공 시 상품 목록 페이지로 이동
      alert("상품이 성공적으로 등록되었습니다!");
      navigate("/items");
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration">
      <div className="registrationContainer">
        <div className="registrationHeader">
          <h1 className="registrationTitle">상품 등록하기</h1>
          <button
            className="submitBtn"
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              !formData.name ||
              !formData.description ||
              !formData.price
            }
          >
            등록
          </button>
        </div>

        <form onSubmit={handleSubmit} className="registrationForm">
          {/* 상품명 */}
          <div className="formGroup">
            <label className="formLabel">상품명</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="상품명을 입력해주세요"
              className="formInput"
              required
            />
          </div>

          {/* 상품 소개 */}
          <div className="formGroup">
            <label className="formLabel">상품 소개</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="상품 소개를 입력해주세요"
              className="formTextarea"
              rows="8"
              required
            />
          </div>

          {/* 판매가격 */}
          <div className="formGroup">
            <label className="formLabel">판매가격</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="판매 가격을 입력해주세요"
              className="formInput"
              required
            />
          </div>

          {/* 태그 */}
          <div className="formGroup">
            <label className="formLabel">태그</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="태그를 입력해주세요"
              className="formInput"
            />
            <div className="tagButtons">
              <button type="button" className="tagButton">
                #티셔츠
              </button>
              <button type="button" className="tagButton">
                #상의
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
