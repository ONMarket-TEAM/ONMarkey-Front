<!-- components/post/PostCard.vue -->
<template>
  <div class="post-card" @click="goToDetail">
    <!-- 상단 대출 버튼과 D-12 -->
    <div class="card-header">
      <button class="loan-btn">{{ buttonText }}</button>
      <span class="deadline">{{ deadline }}</span>
    </div>
    
    <!-- 제목 -->
    <h3 class="card-title">{{ title }}</h3>
    
    <!-- 설명 -->
    <p class="card-description">{{ description }}</p>
    
    <!-- 하단 태그들 -->
    <div class="card-tags">
      <span class="tag" v-for="tag in tags" :key="tag">#{{ tag }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Props 정의
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    default: '서울시 예비 창업금 대출'
  },
  description: {
    type: String,
    default: '서울 소재 예비창업자에게 저금리로 운영자금 대출'
  },
  tags: {
    type: Array,
    default: () => ['서울', '저금리']
  },
  deadline: {
    type: String,
    default: 'D-12'
  }
})

// 현재 경로에 따라 버튼 텍스트 결정
const buttonText = computed(() => {
  if (route.path === '/loans') {
    return '대출'
  } else if (route.path === '/supports') {
    return '공공 지원금'
  }
  return '대출'
})

// 상세 페이지로 이동
const goToDetail = () => {
  // 현재 경로가 /loans인지 /supports인지 확인
  if (route.path === '/loans') {
    router.push(`/loans/${props.id}`)
  } else if (route.path === '/supports') {
    router.push(`/supports/${props.id}`)
  }
}
</script>

<style scoped>
.post-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.loan-btn {
  background: #fff;
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.loan-btn:hover {
  background: #ff6b6b;
  color: white;
}

.deadline {
  color: #ff6b6b;
  font-weight: bold;
  font-size: 16px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.card-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 20px 0;
  flex-grow: 1;
}

.card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: #f5f5f5;
  color: #666;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}
</style>