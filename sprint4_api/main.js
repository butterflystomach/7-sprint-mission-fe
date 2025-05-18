// ArticleService와 ProductService 모듈 불러오기
import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
} from './article.js';

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
} from './product.js';

// 구분선 출력을 위한 헬퍼 함수
function printDivider(title) {
  console.log('\n' + '='.repeat(50));
  console.log(`${title}`);
  console.log('='.repeat(50));
}

// 테스트용 ID 저장 변수
let testArticleId = '';
let testProductId = '';

// Article API 테스트
function testArticleAPI() {
  printDivider('Article API 테스트 시작');
  
  // 1. 아티클 목록 조회
  printDivider('1. 아티클 목록 조회');
  getArticleList({ page: 1, pageSize: 5 })
    .then(data => {
      console.log('아티클 목록:', data);
      
      // 2. 새 아티클 생성
      printDivider('2. 새 아티클 생성');
      return createArticle({
        title: '테스트 아티클',
        content: '이것은 테스트 아티클입니다.',
        image: 'https://via.placeholder.com/150'
      });
    })
    .then(newArticle => {
      console.log('생성된 아티클:', newArticle);
      testArticleId = newArticle.id;
      
      // 3. 특정 아티클 조회
      printDivider('3. 특정 아티클 조회');
      return getArticle(testArticleId);
    })
    .then(article => {
      console.log('조회된 아티클:', article);
      
      // 4. 아티클 수정
      printDivider('4. 아티클 수정');
      return patchArticle(testArticleId, {
        title: '수정된 테스트 아티클',
        content: '이 내용은 수정되었습니다.'
      });
    })
    .then(updatedArticle => {
      console.log('수정된 아티클:', updatedArticle);
      
      // 5. 아티클 삭제
      printDivider('5. 아티클 삭제');
      return deleteArticle(testArticleId);
    })
    .then(result => {
      console.log('아티클 삭제 결과:', result);
      printDivider('Article API 테스트 완료');
      
      // 다음 테스트 실행
      testProductAPI();
    })
    .catch(error => {
      console.error('Article API 테스트 중 오류 발생:', error);
    });
}

// Product API 테스트 (async/await 방식)
async function testProductAPI() {
  try {
    printDivider('Product API 테스트 시작');
    
    // 1. 상품 목록 조회
    printDivider('1. 상품 목록 조회');
    const products = await getProductList({ page: 1, pageSize: 5 });
    console.log('상품 목록:', products);
    
    // 2. 새 상품 생성
    printDivider('2. 새 상품 생성');
    const newProduct = await createProduct({
      name: '테스트 상품',
      description: '이것은 테스트 상품입니다.',
      price: 10000,
      tags: ['테스트', '샘플'],
      images: ['https://via.placeholder.com/150']
    });
    console.log('생성된 상품:', newProduct);
    testProductId = newProduct.id;
    
    // 3. 특정 상품 조회
    printDivider('3. 특정 상품 조회');
    const product = await getProduct(testProductId);
    console.log('조회된 상품:', product);
    
    // 4. 상품 수정
    printDivider('4. 상품 수정');
    const updatedProduct = await patchProduct(testProductId, {
      name: '수정된 테스트 상품',
      description: '이 상품 설명은 수정되었습니다.',
      price: 15000
    });
    console.log('수정된 상품:', updatedProduct);
    
    // 5. 상품 삭제
    printDivider('5. 상품 삭제');
    const deleteResult = await deleteProduct(testProductId);
    console.log('상품 삭제 결과:', deleteResult);
    
    printDivider('Product API 테스트 완료');
    printDivider('모든 API 테스트 완료');
    
  } catch (error) {
    console.error('Product API 테스트 중 오류 발생:', error);
  }
}

// 테스트 시작
console.log('API 테스트를 시작합니다...');
testArticleAPI();