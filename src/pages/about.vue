<template>
  <div class="about">
    <div class="about__inner">
      <div class="about__nav">
        <div
          v-for="nav in ABOUT_NAVIGATION"
          :key="nav.to"
          class="about__nav__item"
          :class="{'about__nav__item--active': nav.to === $route.name}"
          @click="
            nav.to !== $route.name ? $router.push({name: nav.to}) : () => {}
          "
        >
          {{ nav.text }}
        </div>
      </div>
      <div v-if="$route.name === 'about'" class="about__first">
        <img
          v-if="false"
          class="about__titleImage"
          src="~/assets/images/progressiveApp.svg"
        />
        <h2 class="about__title">
          {{ $t(`about.title`) }}<span style="color: #e31337">3</span>
        </h2>
        <p class="about__text">{{ $t('about.text') }}</p>
        <!-- <h2 style="opacity: 0.5; margin-top: 120px">Why choose Hive?</h2> -->
        <div>
          <div class="about__feature">
            <h3 class="about__feature__text">{{ $t('about.featureFast') }}.</h3>
            <h4>{{ $t('about.featureFastText') }}</h4>
          </div>

          <div class="about__feature">
            <h3 class="about__feature__text">
              {{ $t('about.featureScalable') }}.
            </h3>
            <h4>{{ $t('about.featureScalableText') }}</h4>
          </div>

          <div class="about__feature">
            <h3 class="about__feature__text">
              {{ $t('about.featurePowerful') }}.
            </h3>
            <h4>
              {{ $t('about.featurePowerfulText') }}
            </h4>
          </div>
        </div>
      </div>
      <!-- Roadmap -->
      <div v-if="$route.name === 'roadmap'" class="about__first roadmap">
        <h2 class="about__title">
          Roadmap
        </h2>
        <p class="about__text">Just about all our core development updates are shared on Hive
          <a href="https://hive.blog/@blocktrades/posts" target="_blank" rel="nofollow noopener noreferrer">@blocktrades</a>
        </p>
        <div class="about__feature">
          <h3 class="about__feature__text">2025 Q3</h3>
          <h4 class="about__feature__sub">Updated HAF API stack</h4>
          <h4 class="about__feature__sub">Hived Node software</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/>
                Lightweight hived only requires 4GB memory (next step to running on smart phones)
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Interactive API documentation web sites (swagger-based)
              </li>
            </ul>
          </h4>
          <h4 class="about__feature__sub">Social media API server</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/>
                Improved mute handling in Hivemind
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Keyword-based search added to Hivemind API
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Semantic text search and related post search with new HiveSense API
              </li>
            </ul>
          </h4>
            <h4 class="about__feature__sub">Wallet balance tracking and account history API servers</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/>
                Savings balances
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Pending coin conversions (@actifit)
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Open market orders (@actifit)
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Average transfer statistics
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Recurrent transfers
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Recent trades and trade history APIs for accounts
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Rich list (@actifit)
              </li>
            </ul>
          </h4>
          <h4 class="about__feature__sub">Block explorer API</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/>
                Speedup witness vote calculations
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Speedup permlink searching
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                More types of data available
              </li>
            </ul>
          </h4>
          <h4 class="about__feature__sub">Hive libraries</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/>
                Wax: Typescript & Python library for Hive Dapp development
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Typescript WorkerBee: library for lightweight block processing (e.g. bot creation) (add-on to Wax)
              </li>
            </ul>
          </h4>
          <h4 class="about__feature__sub">Embeddable HTML Web page Components</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/> 
                Binary Transaction viewer
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Display account
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Display witness
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Display post headers/footers and/or content
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Display post comments
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Display filter post lists (e.g. by tag)
              </li>
            </ul>
          </h4>
          <h4 class="about__feature__sub">Embeddable Wax UI components</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/>
                Embeddable API health checker component for Hive dapps
              </li>
            </ul>
          </h4>
          <h4 class="about__feature__sub">Web Dapps</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/>
                Transaction Inspector (layer 1 release)
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Updated Block Explorer UI
              </li>
            </ul>
          </h4>
          <h4 class="about__feature__sub">Key management and security apps</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/>
                Beekeeper: lightweight process for managing private keys (Wax bindings available)
                </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Metamask wallet snap for Hive accounts
              </li>
            </ul>
          </h4>
        </div>

        <div class="about__feature">
          <h3 class="about__feature__text">2025 Q4</h3>          
          <h4 class="about__feature__sub">Updated HAF (base layer for designing API servers)</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/>
                Lightweight version of HAF (pruned tables)
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Support for lightweight accounts (including social media-based login)
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Support for 2nd layer transactions
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Apps respond immediately to new blocks
              </li>
            </ul>
          </h4>
          <h4 class="about__feature__sub">Hive Libraries</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/>
                Begin updating Wax to optimize server-side API caches
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Python WorkerBee: library for lightweight block processing (e.g. bot creation)
              </li>
            </ul>
          </h4>
          <h4 class="about__feature__sub">Web Dapps</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/>
                Denser: modern replacement for Condenser social media web app
              </li>
            </ul>
          </h4>
          <h4 class="about__feature__sub">Key management and security apps</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/>
                Clive: new command-line and Terminal UI wallet
              </li>
            </ul>
          </h4>
          <h4 class="about__feature__sub">Coinbase Mesh API support for Hive</h4>
        </div>

        <div class="about__feature">
          <h3 class="about__feature__text">2026 Q1</h3>h

          <h4 class="about__feature__sub">Prototyping for smart contracts designing</h4>

          <h4 class="about__feature__sub">Updates to API stack</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/>
                Prototype REST-based API for hivemind (social media API)
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                New community functionality for hivemind (@howo)
              </li>
            </ul>
          </h4>
          <h4 class="about__feature__sub">Web Dapps</h4>
          <h4>
            <ul>
              <li>
                <input id="find" type="checkbox" disabled/>
                Customizable Hive web sites (@peakd)
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Updates to Denser (TBD) 
              </li>
              <li>
                <input id="find" type="checkbox" disabled/>
                Transaction Inspector (layer 2 release)
               </li>
            </ul>
         </h4>  
        </div>

        <div class="about__feature">                   
          <h3 class="about__feature__text">2026 Q2</h3>

          <h4 class="about__feature__sub">Hived Blockchain nodes on ARM-based cell phones</h4> 
        </div>

        <div class="about__feature">
          <h3 class="about__feature__text">2026 Q3</h3>

          <h4 class="about__feature__sub">Pruned HAF API nodes on ARM-based cell phones? (for personal API nodes)</h4>
        </div>   
      </div>
      <Updates v-if="$route.name === 'about-updates'" />
      <Contributors v-if="$route.name === 'about-contributors'" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {ABOUT_NAVIGATION} from '~/helpers/navigation'

export default defineComponent({
  name: 'About',
  components: {},
  props: {},
  setup() {
    return {ABOUT_NAVIGATION}
  },
})
</script>

<style lang="scss" scoped>
.roadmap ul {
    list-style-type: none;
}
.roadmap li {
  margin-bottom: 15px;
}

.about {
  display: flex;
  align-items: center;
  margin-bottom: 150px;
  &__inner {
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 0 30px;
  }

  &__first {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    padding: 0 0 40px 0;
    max-width: 820px;
    text-align: center;
    min-height: 60vh;
  }

  &__nav {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 40px;

    &__item {
      flex: 1;
      margin: 5px 7px;
      padding: 10px 20px;
      min-width: 110px;
      text-align: center;
      color: white;
      background: rgba(33, 37, 41, 0.6);
      border-radius: 5px;
      cursor: pointer;

      &--active {
        background: $primary-color-100;
      }
    }
  }

  &__titleImage {
    height: 150px;
    margin-bottom: 35px;
  }

  &__text {
    max-width: 800px;
  }

  h2 {
    font-size: 3.2rem;
  }

  h3 {
    font-size: 2.4rem;
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 400;
    text-align: left !important;
  }

  &__feature {
    width: 100%;
    max-width: 600px;
    min-width: 200px;
    margin: 10px;
    padding: 10px 0;
    &__text {
      width: fit-content;
      border-bottom: 10px solid #e31236;
      margin-bottom: 12px;
    }
    &__sub {
      width: fit-content;
      color: #e31236;
      margin-bottom: 12px;
    }
  }
}
</style>
