<!-- pages/post/LoanDetail.vue -->
<template>
  <div class="loan-detail-container">
    <!-- 상품 이미지 -->
    <div class="product-image">
      <div class="image-placeholder">
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <!-- 상품 정보 -->
    <div class="product-info">
      <div class="product-header">
        <div class="product-meta">
          <span class="product-name">{{ productDetail.name }}</span>
          <span class="product-date">{{ productDetail.date }}</span>
        </div>
        <div class="action-buttons">
          <button class="like-btn" @click="toggleLike">
            <i class="fas fa-heart heart-icon" :class="{ 'liked': isLiked }" v-if="isLiked"></i>
            <i class="far fa-heart heart-icon" v-else></i>
          </button>
          <button class="interest-btn">가입하기</button>
        </div>
      </div>

      <!-- 상품 설명 -->
      <div class="product-description">
        <p>{{ productDetail.description }}</p>
        <br>
        <p>{{ productDetail.additionalInfo }}</p>
      </div>
    </div>

    <!-- 상품 후기 섹션 -->
    <div class="review-section">
      <div class="review-header">
        <h3>상품 후기</h3>
        <button class="write-review-btn" @click="openModal">작성하기</button>
      </div>

      <div class="review-item" v-for="review in reviews" :key="review.id">
        <div class="review-author">
          <span class="author-name">{{ review.author }}</span>
          <span class="review-date">{{ review.date }}</span>
        </div>
        <div class="review-rating">
          <i v-for="n in 5" :key="n" 
             class="star"
             :class="n <= review.rating ? 'fas fa-star filled' : 'far fa-star'">
          </i>
        </div>
        <p class="review-content">{{ review.content }}</p>
      </div>
    </div>

    <!-- 후기 작성 모달 -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>상품 후기를 남겨주세요!</h2>
        </div>
        
        <!-- 별점 선택 -->
        <div class="rating-section">
          <div class="rating-stars">
            <i v-for="n in 5" :key="n"
               class="star-button"
               :class="n <= selectedRating ? 'fas fa-star active' : 'far fa-star'"
               @click="setRating(n)">
            </i>
          </div>
        </div>

        <!-- 텍스트 입력 -->
        <div class="review-form">
          <textarea 
            v-model="reviewText"
            placeholder="내용을 작성해주세요"
            class="review-textarea"
            maxlength="300">
          </textarea>
          <div class="char-count">{{ reviewText.length }}/300</div>
        </div>

        <!-- 버튼들 -->
        <div class="modal-actions">
          <button class="cancel-btn" @click="closeModal">취소</button>
          <button class="submit-btn" @click="submitReview" :disabled="!canSubmit">등록하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 좋아요 상태
const isLiked = ref(false)

// 모달 관련 상태
const isModalOpen = ref(false)
const selectedRating = ref(0)
const reviewText = ref('')

// 모달 열기/닫기
const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedRating.value = 0
  reviewText.value = ''
}

// 별점 설정
const setRating = (rating) => {
  selectedRating.value = rating
}

// 후기 제출 가능 여부
const canSubmit = computed(() => {
  return selectedRating.value > 0 && reviewText.value.trim().length > 0
})

// 후기 제출
const submitReview = () => {
  if (!canSubmit.value) return
  
  // 새 후기 추가 (실제로는 API 호출)
  const newReview = {
    id: reviews.value.length + 1,
    author: '사용자',
    date: new Date().toLocaleDateString('ko-KR'),
    rating: selectedRating.value,
    content: reviewText.value
  }
  
  reviews.value.unshift(newReview)
  closeModal()
  
  // 성공 알림 (선택사항)
  alert('후기가 등록되었습니다!')
}

// 좋아요 토글
const toggleLike = () => {
  isLiked.value = !isLiked.value
}

// 샘플 상품 데이터 (실제로는 API에서 ID로 조회)
const productDetail = computed(() => {
  const isLoanPage = route.path.includes('/loans/')
  
  if (isLoanPage) {
    return {
      name: '상품 이름',
      date: '2024/01/23',
      description: '여우빛 비나리 메그리나 아름드리 곤다시 이쁜 다숨 다숨 이쁜 늘품 도서 아슬라 여우빛 별빛 아슬라 미리내 늘품 도서 우리는 비나리 소록소록 달별 가온해 별빛 곤다서 여우빛 나비잠 여우별 로온 도서 감또개 채빛 도담도담 이쁜 아슬라 별빛 나래 그루잠 소솜 안녕 아리아 도르래 늘품 아리아 그루잠 도서 나비잠 포도 열구름 미리내.',
      additionalInfo: '바나나 바나나 로온 소록소록 여우빛 로온 아리아 미리내 도르래 그루잠 비나리 가온해 함초롬하다 나래 로온 비나리 별빛 도서곤 가온해 어린 미쁘다 그루잠 나래 로온 감또개 우리는 아름드리 다숨 비나리 곤다서 시과 을 포도 여우빛 아리아 로온 함초롱하다 얌구름 달별 가은누리 이쁜 나비잠 바나나 로온 가온누리 가온누리 아슬라 소록소록 바나나 도르래.'
    }
  } else {
    return {
      name: '지원금 이름',
      date: '2024/01/23',
      description: '정부 지원금 관련 상세 설명이 여기에 들어갑니다...',
      additionalInfo: '추가 정보가 여기에 표시됩니다...'
    }
  }
})

// 샘플 후기 데이터
const reviews = ref([
  {
    id: 1,
    author: '김어원',
    date: '2024/01/23',
    rating: 5,
    content: '위치도 좋고 금리도 생각보다 넘나요, 구리던 음푸드도 다양하고 빌즈 있어서 친구들과 같이 재밌게 놀다 왔습니다. 감사합니다.'
  }
])
</script>

<style scoped>
.loan-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 300px;
  background: #e0e0e0;
  border-radius: 12px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-dots {
  display: flex;
  gap: 8px;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background: #ccc;
  border-radius: 50%;
  animation: loading 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes loading {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.product-info {
  margin-bottom: 32px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.product-name {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.product-date {
  color: #666;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.like-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #ddd;
  transition: color 0.2s ease;
  padding: 8px;
}

.heart-icon {
  transition: color 0.2s ease;
}

.heart-icon.liked {
  color: #ff6b6b;
}

.interest-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.interest-btn:hover {
  background: #ff5252;
}

.product-description {
  line-height: 1.6;
  color: #333;
  font-size: 15px;
}

.review-section {
  border-top: 1px solid #eee;
  padding-top: 24px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.review-header h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
  position: relative;
}

.review-header h3::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background: #ff6b6b;
  margin-top: 4px;
}

.write-review-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s ease;
}

.write-review-btn:hover {
  border-color: #ff6b6b;
  color: #ff6b6b;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  text-align: center;
  margin-bottom: 32px;
  display: block !important; /* Bootstrap 스타일 덮어쓰기 */
  padding: 0 !important;
  border-bottom: none !important;
}

.modal-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

.rating-section {
  text-align: center;
  margin-bottom: 24px;
}

.rating-stars {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.star-button {
  font-size: 32px;
  color: #ddd;
  cursor: pointer;
  transition: color 0.2s ease;
}

.star-button.active {
  color: #ffc107;
}

.star-button:hover {
  color: #ffc107;
}

.review-form {
  margin-bottom: 24px;
}

.review-textarea {
  width: 100%;
  height: 120px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  box-sizing: border-box;
}

.review-textarea:focus {
  outline: none;
  border-color: #ff6b6b;
}

.review-textarea::placeholder {
  color: #999;
}

.char-count {
  text-align: right;
  margin-top: 8px;
  font-size: 12px;
  color: #999;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.cancel-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  border-color: #999;
  color: #333;
}

.submit-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #ff5252;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.review-item {
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
}

.review-item:last-child {
  border-bottom: none;
}

.review-author {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.author-name {
  font-weight: 500;
  color: #333;
}

.review-date {
  color: #999;
  font-size: 14px;
}

.review-rating {
  margin-bottom: 12px;
}

.star {
  color: #ddd;
  font-size: 14px;
  margin-right: 2px;
}

.star.filled {
  color: #ffc107;
}

.review-content {
  color: #555;
  line-height: 1.5;
  margin: 0;
}
</style>
