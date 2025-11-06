# 🎉 FestaPick

<div align="center">

  <h3>
    🎉 <b>모두가 함께 만들어가는 축제 플랫폼</b> 🎊
  </h3>

  <img 
    src="https://github.com/user-attachments/assets/f1c3b239-52a7-4329-accf-f17bb096b77e" 
    alt="FestaPick_hero_image" 
    width="60%" 
  />

  <br/>

  <!-- Custom Website Badge -->
  <a href="https://www.festapick.com">
    <img 
      src="https://img.shields.io/badge/Website-FestaPick-FF6B00?style=for-the-badge&logoColor=white" 
      alt="Website - FestaPick" 
    />
  </a>

  <p>
    <b>
      <a href="https://www.notion.so/FestaPick-2a33ff5fbfc78001b4f0d3f4a33f87a0" target="_blank">
        FestaPick 가이드북
      </a>
    </b>
  </p>

</div>

## 소개
FestaPick은 **축제 참여자**와 **축제 관리자(주최측)** 모두가 함께 쓰는 플랫폼입니다.  

- 💬 축제별 채팅방을 통해 참여자 간 정보 공유
- 🧭 여행 MBTI 입력으로 사용자 맞춤 축제 추천
- 📝 간편한 축제 등록 및 관리 지원
- 📢 공지사항 기능을 통한 빠른 정보 전달

---

## 핵심 기능

### 👤 사용자 기능

#### 🎯 성향 기반 축제 맞춤 추천  
<p>
  <img src="https://github.com/user-attachments/assets/36242224-b7eb-495c-8c09-ef2c9dbf77c9" alt="성향 추천 1" width="200" />
</p>

- 지도에 있는 픽픽(PickPick)을 선택해 지역을 설정하고, 여행 MBTI를 입력하면 사용자의 성향에 맞는 축제를 추천받을 수 있습니다.  
- 추천받은 축제 중 마음에 드는 축제를 클릭하면 상세 정보를 조회할 수 있습니다.  

#### ❤️ 좋아요 / 리뷰 작성  
<p>
  <img src="https://github.com/user-attachments/assets/08948c0b-01f2-46c9-a625-bf34e61ddccb" alt="좋아요/리뷰" width="200" />
</p>

- 마음에 드는 축제는 좋아요를 눌러 저장할 수 있습니다.  
- 다녀온 축제에 대해서는 리뷰를 작성해 다른 사용자와 경험을 공유할 수 있습니다.
  
#### 💬 채팅 / 채팅 알람 기능  
<p>
  <img src="https://github.com/user-attachments/assets/84806e0d-bbd9-415b-8206-aa160b995829" alt="채팅 1" width="180" />
  <img src="https://github.com/user-attachments/assets/1706acdc-b6fc-482c-9df0-563fde81d03a" alt="채팅 2" width="180" />
</p>

- 각 축제별 채팅방에서 참여자들과 실시간으로 정보를 공유할 수 있습니다.  
- 마이페이지에서는 참여 중인 채팅방의 알림 여부를 확인할 수 있습니다.  

### 🧩 관리자 기능

#### 🧑‍💼 축제 관리자 등업 신청  
<p>
  <img src="https://github.com/user-attachments/assets/92c33993-3595-4701-a4ac-5774093dc4da" alt="관리자 등업 신청" width="200" />
</p>

- 축제를 직접 관리하고 싶다면 관리자 등업을 신청할 수 있습니다.  
- 신청 시 소속 정보와 관련 서류를 제출합니다.  
- Admin 승인 후 등업 여부가 결정됩니다.

#### 🛂 등록된 축제에 대한 관리자 신청  
<p>
  <img src="https://github.com/user-attachments/assets/f4d85b13-0e71-4d09-bfce-fbd2a0a5bcd5" alt="기존 축제 관리자 신청" width="200" />
</p>

- 관광공사(TourAPI)에 등록된 축제에 대해 관리자 권한을 신청할 수 있습니다.  
- Admin 승인 후, 해당 축제에 대한 수정·삭제·공지사항 등록 권한을 획득합니다.  

#### 📝 나의 축제 등록하기  
<p>
  <img src="https://github.com/user-attachments/assets/2e20b0f3-0989-4b2e-b5a2-444f1a8fd892" alt="나의 축제 등록" width="200" />
</p>

- 축제 관리자는 새로운 축제를 등록할 수 있습니다.  
- 등록된 축제는 Admin의 승인 후 일반 사용자에게 노출됩니다.  

#### 🗂️ 등록 축제 관리  
<p>
  <img src="https://github.com/user-attachments/assets/b27bd4a4-3e6f-4822-af47-f3a5baa95baa" alt="등록 축제 관리" width="200" />
</p>

- 자신이 등록한 축제에 대해 공지사항을 등록할 수 있습니다.  
- 축제 정보를 수정 및 삭제할 수 있습니다.  

---

## 모니터링
#### 🔎 ELK(ElasticSearch, Logstash, Kibana), Filebeat를 활용한 로그 모니터링
<img width="2926" height="1202" alt="image" src="https://github.com/user-attachments/assets/fc873a53-5af8-4f0f-a025-ec43984f9217" />

- 로그를 직접 서버 인스턴스에 접속해서 확인하는게 아닌 전문 검색을 통해서 로그를 확인할 수 있습니다.
- 예외가 발생한 REQUEST/RESPONSE에 대해서는 UUID를 저장한 로그를 남겨 어떤 엔드포인트에서 어떤 예외가 발생했는지 확인할 수 있습니다.

#### 📊 Prometheus, Grafana를 활용한 메트릭 모니터링
<img width="1468" height="805" alt="스크린샷 2025-11-06 오후 11 06 46" src="https://github.com/user-attachments/assets/983bea0c-1ac4-4cef-97d5-97b059dacffb" />

- Prometheus를 통해 Spring Boot 서버의 메트릭을 수집하고 Grafana를 통해서 시각화하여 대시보드를 제공합니다.

## 기술 스택

<p align="center">
  <!-- Framework -->
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>
<P align="center">
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>
<P align="center">
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Error_Boundary-CC0000?style=for-the-badge&logo=react&logoColor=white" />
</p>
<P align="center">
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" />
  <img src="https://img.shields.io/badge/MSW-FF6A33?style=for-the-badge&logo=mock-service-worker&logoColor=white" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/Prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" />
</p>

---

## 시스템 아키텍쳐

<img width="2614" height="1470" alt="Group 82" src="https://github.com/user-attachments/assets/87624179-0cde-4bed-b789-e3fd031770c8" />


## ERD

<div align="center">

<img src="https://github.com/user-attachments/assets/e7ba25ba-68ce-4be3-a3a4-6be5d4b5099b" alt="ERD" width="800" />

<table width="800" align="center">
  <thead>
    <tr>
      <th><b>엔티티(Entity)</b></th>
      <th><b>설명(Description)</b></th>
    </tr>
  </thead>
  <tbody>
    <tr><td><b>ChatMessage</b></td><td>사용자가 보낸 채팅 메시지를 저장합니다.</td></tr>
    <tr><td><b>ChatParticipant</b></td><td>사용자가 어느 채팅방에 들어갔는지, 채팅방의 채팅을 어디까지 읽었는지 저장합니다.</td></tr>
    <tr><td><b>ChatRoom</b></td><td>각 축제별 채팅방 정보를 저장합니다.</td></tr>
    <tr><td><b>Festival</b></td><td>축제에 대한 상세 정보를 저장합니다.</td></tr>
    <tr><td><b>FestivalNotice</b></td><td>축제 관리자(Festival Manager)가 작성한 공지사항을 저장합니다.</td></tr>
    <tr><td><b>FestivalPermission</b></td><td>축제(TourAPI를 통해 등록된 축제)에 대한 관리 신청서를 저장합니다.</td></tr>
    <tr><td><b>FMPermission</b></td><td>축제 관리자(Festival Manager) 신청서를 저장합니다.</td></tr>
    <tr><td><b>RecommendationHistory</b></td><td>사용자가 가장 최근에 받았던 AI 추천 내역을 저장합니다.</td></tr>
    <tr><td><b>Review</b></td><td>사용자가 등록한 축제의 리뷰를 저장합니다.</td></tr>
    <tr><td><b>users</b></td><td>사용자 정보를 저장합니다.</td></tr>
    <tr><td><b>Wish</b></td><td>사용자의 축제 좋아요 기록을 저장합니다.</td></tr>
  </tbody>
</table>

</div>




## 팀원 소개

<div align="center">
  <table>
    <thead>
      <tr>
        <th style="text-align:center;">이진원</th>
        <th style="text-align:center;">이윤재</th>
        <th style="text-align:center;">주연학</th>
        <th style="text-align:center;">하석현</th>
        <th style="text-align:center;">문수호</th>
        <th style="text-align:center;">심영찬</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center"><img src="https://github.com/jinwon1234.png" width="150" height="150" alt="이진원"></td>
        <td align="center"><img src="https://github.com/YUNJAEGOONER.png" width="150" height="150" alt="이윤재"></td>
        <td align="center"><img src="https://github.com/jyhyt1567.png" width="150" height="150" alt="주연학"></td>
        <td align="center"><img src="https://github.com/studyhard01.png" width="150" height="150" alt="하석현"></td>
        <td align="center"><img src="https://github.com/dib3474.png" width="150" height="150" alt="문수호"></td>
        <td align="center"><img src="https://github.com/skybluesharkk.png" width="150" height="150" alt="심영찬"></td>
      </tr>
      <tr>
        <td align="center">BE</td><td align="center">BE</td><td align="center">BE</td>
        <td align="center">AI</td><td align="center">FE</td><td align="center">FE</td>
      </tr>
      <tr>
        <td align="center"><a href="https://github.com/jinwon1234">GitHub</a></td>
        <td align="center"><a href="https://github.com/YUNJAEGOONER">GitHub</a></td>
        <td align="center"><a href="https://github.com/jyhyt1567">GitHub</a></td>
        <td align="center"><a href="https://github.com/studyhard01">GitHub</a></td>
        <td align="center"><a href="https://github.com/dib3474">GitHub</a></td>
        <td align="center"><a href="https://github.com/skybluesharkk">GitHub</a></td>
      </tr>
    </tbody>
  </table>
</div>
