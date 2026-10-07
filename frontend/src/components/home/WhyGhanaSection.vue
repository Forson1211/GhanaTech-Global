<template>
  <section class="why-ghana-banner" aria-labelledby="why-ghana-title">
    <div class="why-ghana-container">
      <div class="why-ghana-copy">
        <h2 id="why-ghana-title">Ghanaian talent.<br />Ready for the world.</h2>
        <p>
          <span class="why-ghana-desktop-description">
          Meet skilled tech professionals from Ghana. Explore their experience, communication skills, and interest in working with global teams.
          </span>
          <span class="why-ghana-mobile-description">Meet Ghana’s skilled technology professionals, ready to connect and grow with U.S. teams.</span>
        </p>
        <router-link to="/why-ghana" class="why-ghana-button">
          Explore Why Ghana
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7" />
          </svg>
        </router-link>
      </div>
      <div class="why-ghana-mobile-photo">
        <img src="/images/african-office-team.jpg" alt="African technology colleagues working together in an office" width="2098" height="750" loading="lazy" decoding="async" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.why-ghana-banner {
  display: flex;
  align-items: center;
  min-height: 490px;
  padding: 88px 0;
  background-color: #fff;
  background-image: linear-gradient(90deg, #fff 0%, rgba(255,255,255,.97) 30%, rgba(255,255,255,.86) 39%, rgba(255,255,255,.26) 51%, rgba(255,255,255,.04) 66%, transparent 100%), url('/images/african-office-team.jpg');
  background-size: cover;
  background-position: center, right center;
  background-repeat: no-repeat;
}
.why-ghana-container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 32px; }
.why-ghana-copy { max-width: 535px; text-align: left; }
.why-ghana-copy h2 { color: #32114f; font-size: clamp(32px, 3.5vw, 46px); font-weight: 700; letter-spacing: -1.3px; line-height: 1.35; }
.why-ghana-copy p { max-width: 485px; margin-top: 24px; color: #62596d; font-size: 18px; line-height: 1.8; }
.why-ghana-mobile-description, .why-ghana-mobile-photo { display: none; }
.why-ghana-button { display: inline-flex; align-items: center; justify-content: center; gap: 12px; margin-top: 30px; padding: 15px 24px; border-radius: 6px; background: #6d28d9; color: #fff; font-size: 16px; font-weight: 700; text-decoration: none; transition: background .2s; }
.why-ghana-button:hover { background: #5520aa; }
.why-ghana-button:focus-visible { outline: 3px solid #a78bfa; outline-offset: 4px; }
@media (max-width: 767px) {
  .why-ghana-banner { min-height: 0; padding: 44px 0; background-image: none; }
  .why-ghana-container { padding: 0 20px; }
  .why-ghana-copy { max-width: 440px; margin: 0 auto; text-align: center; }
  .why-ghana-copy h2 { font-size: 30px; letter-spacing: -.75px; line-height: 1.35; }
  .why-ghana-copy p { max-width: 340px; margin: 18px auto 0; font-size: 16px; line-height: 1.75; }
  .why-ghana-desktop-description { display: none; }
  .why-ghana-mobile-description { display: inline; }
  .why-ghana-button { margin-top: 24px; font-size: 15px; }
  .why-ghana-mobile-photo { display: block; max-width: 540px; margin: 32px auto 0; overflow: hidden; border-radius: 12px; }
  .why-ghana-mobile-photo img { display: block; width: 100%; aspect-ratio: 16 / 9; height: auto; object-fit: cover; object-position: right center; }
}
</style>
