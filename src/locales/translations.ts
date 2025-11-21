export const translations = {
  ko: {
    header: {
      city: "부산광역시",
      system: "부산광역시 축제정보시스템",
      subtitle: "BUSAN FESTIVAL",
      login: "로그인",
      logout: "로그아웃"
    },
    hero: {
      title: "부산광역시 축제 안내",
      description: "부산에서 개최되는 다양한 축제 정보를 한눈에 확인하세요",
      button: "축제 정보 보기"
    },
    quickLinks: {
      yearRound: {
        title: "연중 축제",
        description: "사계절 내내 다양한 축제 개최"
      },
      easyAccess: {
        title: "편리한 접근",
        description: "부산 전역 축제 위치 안내"
      },
      detailedInfo: {
        title: "상세 정보",
        description: "일정, 장소, 연락처 제공"
      }
    },
    festivalList: {
      title: "축제 목록",
      description: "부산에서 진행 중인 축제를 확인하세요"
    },
    pagination: {
      first: "처음",
      prev: "이전",
      next: "다음",
      last: "마지막",
      showing: (start: number, end: number, total: number, page: number, totalPages: number) =>
        `전체 ${total}개 중 ${start}~${end}개 표시 (페이지 ${page}/${totalPages})`
    },
    detail: {
      backToList: "목록으로 돌아가기",
      notFound: "축제 정보를 찾을 수 없습니다.",
      sections: {
        introduction: "축제 소개",
        traffic: "교통 정보",
        detailInfo: "상세 정보"
      },
      fields: {
        period: "기간",
        time: "운영시간",
        location: "장소",
        address: "주소",
        fee: "이용요금",
        contact: "문의전화",
        homepage: "홈페이지"
      }
    },
    comments: {
      title: "댓글",
      placeholder: {
        loggedIn: "댓글을 입력하세요...",
        loggedOut: "로그인 후 댓글을 작성할 수 있습니다."
      },
      loginRequired: "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?",
      emptyContent: "댓글 내용을 입력해주세요.",
      writingAs: (email: string) => `${email}님으로 작성`,
      loginRequiredText: "댓글 작성은 로그인이 필요합니다.",
      submit: "댓글 작성",
      submitting: "작성 중...",
      empty: "첫 댓글을 작성해보세요!",
      edit: "수정",
      delete: "삭제",
      deleteConfirm: "댓글을 삭제하시겠습니까?",
      cancel: "취소",
      update: "수정 완료",
      updating: "수정 중...",
      edited: "(수정됨)",
      writeError: "댓글 작성에 실패했습니다.",
      deleteError: "댓글 삭제에 실패했습니다.",
      updateError: "댓글 수정에 실패했습니다.",
      timeAgo: {
        justNow: "방금 전",
        minutesAgo: (minutes: number) => `${minutes}분 전`,
        hoursAgo: (hours: number) => `${hours}시간 전`,
        daysAgo: (days: number) => `${days}일 전`
      }
    },
    login: {
      title: {
        login: "로그인",
        signUp: "회원가입"
      },
      subtitle: "부산광역시 축제정보시스템",
      email: {
        label: "이메일",
        placeholder: "이메일을 입력하세요"
      },
      password: {
        label: "비밀번호",
        placeholder: "비밀번호를 입력하세요"
      },
      button: {
        login: "로그인",
        signUp: "회원가입",
        processing: "처리 중..."
      },
      toggle: {
        toLogin: "이미 계정이 있으신가요? 로그인",
        toSignUp: "계정이 없으신가요? 회원가입"
      },
      notice: {
        title: "안내사항",
        items: [
          "부산광역시 축제정보시스템 이용을 위해 로그인이 필요합니다.",
          "회원가입 시 이메일과 비밀번호를 입력해주세요.",
          "비밀번호는 6자 이상이어야 합니다."
        ]
      },
      error: "로그인에 실패했습니다."
    },
    footer: {
      mainTitle: "부산광역시",
      mainSubtitle: "축제정보시스템",
      guide: {
        title: "이용안내",
        festivalInfo: "축제 정보",
        howToParticipate: "참여 방법",
        notice: "공지사항"
      },
      policy: {
        title: "정책정보",
        terms: "이용약관",
        privacy: "개인정보처리방침",
        copyright: "저작권정책"
      },
      contact: {
        title: "문의처",
        office: "부산광역시청",
        phone: "전화: 051-120",
        hours: "평일 09:00~18:00"
      },
      copyright: "© 2025 부산광역시. All Rights Reserved.",
      notice: "본 사이트는 부산광역시 공공데이터를 활용하여 제작되었습니다."
    }
  },
  en: {
    header: {
      city: "Busan Metropolitan City",
      system: "Busan Festival Information System",
      subtitle: "BUSAN FESTIVAL",
      login: "Login",
      logout: "Logout"
    },
    hero: {
      title: "Busan Festival Guide",
      description: "Check out various festival information held in Busan at a glance",
      button: "View Festival Info"
    },
    quickLinks: {
      yearRound: {
        title: "Year-Round Festivals",
        description: "Various festivals held throughout all seasons"
      },
      easyAccess: {
        title: "Easy Access",
        description: "Location guide for festivals across Busan"
      },
      detailedInfo: {
        title: "Detailed Information",
        description: "Schedules, venues, and contact information provided"
      }
    },
    festivalList: {
      title: "Festival List",
      description: "Check out ongoing festivals in Busan"
    },
    pagination: {
      first: "First",
      prev: "Prev",
      next: "Next",
      last: "Last",
      showing: (start: number, end: number, total: number, page: number, totalPages: number) =>
        `Showing ${start}-${end} of ${total} (Page ${page}/${totalPages})`
    },
    detail: {
      backToList: "Back to List",
      notFound: "Festival information not found.",
      sections: {
        introduction: "Festival Introduction",
        traffic: "Traffic Information",
        detailInfo: "Detailed Information"
      },
      fields: {
        period: "Period",
        time: "Operating Hours",
        location: "Location",
        address: "Address",
        fee: "Admission Fee",
        contact: "Contact",
        homepage: "Homepage"
      }
    },
    comments: {
      title: "Comments",
      placeholder: {
        loggedIn: "Write a comment...",
        loggedOut: "Please login to write a comment."
      },
      loginRequired: "Login required. Would you like to go to the login page?",
      emptyContent: "Please enter comment content.",
      writingAs: (email: string) => `Writing as ${email}`,
      loginRequiredText: "Login is required to write comments.",
      submit: "Submit Comment",
      submitting: "Submitting...",
      empty: "Be the first to comment!",
      edit: "Edit",
      delete: "Delete",
      deleteConfirm: "Are you sure you want to delete this comment?",
      cancel: "Cancel",
      update: "Update",
      updating: "Updating...",
      edited: "(edited)",
      writeError: "Failed to write comment.",
      deleteError: "Failed to delete comment.",
      updateError: "Failed to update comment.",
      timeAgo: {
        justNow: "just now",
        minutesAgo: (minutes: number) => `${minutes}m ago`,
        hoursAgo: (hours: number) => `${hours}h ago`,
        daysAgo: (days: number) => `${days}d ago`
      }
    },
    login: {
      title: {
        login: "Login",
        signUp: "Sign Up"
      },
      subtitle: "Busan Festival Information System",
      email: {
        label: "Email",
        placeholder: "Enter your email"
      },
      password: {
        label: "Password",
        placeholder: "Enter your password"
      },
      button: {
        login: "Login",
        signUp: "Sign Up",
        processing: "Processing..."
      },
      toggle: {
        toLogin: "Already have an account? Login",
        toSignUp: "Don't have an account? Sign Up"
      },
      notice: {
        title: "Notice",
        items: [
          "Login is required to use the Busan Festival Information System.",
          "Please enter your email and password when signing up.",
          "Password must be at least 6 characters."
        ]
      },
      error: "Login failed."
    },
    footer: {
      mainTitle: "Busan Metropolitan City",
      mainSubtitle: "Festival Information System",
      guide: {
        title: "User Guide",
        festivalInfo: "Festival Info",
        howToParticipate: "How to Participate",
        notice: "Notice"
      },
      policy: {
        title: "Policy",
        terms: "Terms of Service",
        privacy: "Privacy Policy",
        copyright: "Copyright Policy"
      },
      contact: {
        title: "Contact",
        office: "Busan City Hall",
        phone: "Phone: 051-120",
        hours: "Weekdays 09:00~18:00"
      },
      copyright: "© 2025 Busan Metropolitan City. All Rights Reserved.",
      notice: "This site was created using Busan Metropolitan City public data."
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.ko;
