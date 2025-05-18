const BASE_URL = 'https://sprint-mission-api.vercel.app/articles';

export function getArticleList({ page = 1, pageSize = 10, keyword = '' } = {}) {
  const queryParams = new URLSearchParams();
  
  if (page) queryParams.append('page', page);
  if (pageSize) queryParams.append('pageSize', pageSize);
  if (keyword) queryParams.append('keyword', keyword);
  
  const url = `${BASE_URL}?${queryParams.toString()}`;
  
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('아티클 목록 조회 중 오류 발생:', error);
      throw error;
    });
}

export function getArticle(id) {
  return fetch(`${BASE_URL}/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error(`아티클 ${id} 조회 중 오류 발생:`, error);
      throw error;
    });
}

export function createArticle({ title, content, image }) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content, image }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('아티클 생성 중 오류 발생:', error);
      throw error;
    });
}

export function patchArticle(id, updateData) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error(`아티클 ${id} 수정 중 오류 발생:`, error);
      throw error;
    });
}

export function deleteArticle(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json') && response.status !== 204) {
        return response.json();
      } else {
        return { success: true, message: `Article ${id} successfully deleted` };
      }
    })
    .catch(error => {
      console.error(`아티클 ${id} 삭제 중 오류 발생:`, error);
      throw error;
    });
}