<template>
  <div class="p-grid p-fluid dashboard">
    <div class="two-column-layout">
      <div class="p-col-12 p-lg-4">
        <div class="p-col-12 p-lg-4" style="margin-top: 0.7em" >
          <div class="card summary">
            <span class="title">Job Skills</span>
            <span class="detail">Count of ESCO skills used in open positions</span>
            <span class="count jobSkills">{{ countJobSkills }}</span>
          </div>
        </div>
        <div class="p-col-12 p-lg-4">
          <div class="card summary">
            <span class="title">Job Occupations</span>
            <span class="detail">Count of ESCO occupations used in open positions</span>
            <span class="count jobOccupations">{{ countJobOccupations }}</span>
          </div>
        </div>
        <div class="p-col-12 p-lg-4">
          <div class="card summary">
            <span class="title">Candidate Skills</span>
            <span class="detail">Count of ESCO skills used in candidates profiles</span>
            <span class="count candidateSkills">{{ countCandidateSkills }}</span>
          </div>
        </div>
        <div class="p-col-12 p-lg-4">
          <div class="card summary">
            <span class="title">Candidate Occupations</span>
            <span class="detail">Count of ESCO occupations used in candidates profiles</span>
            <span class="count candidateOccupations">{{ countCandidateOccupations }}</span>
          </div>
        </div>
      </div>

      <div class="p-col-12 p-lg-4">
        <div class="p-col-12 p-md-6 p-xl-3">
          <div class="highlight-box">
            <div class="initials" style="background-color: #007be5; color: #00448f">
              <span>TU</span>
            </div>
            <div class="highlight-details">
              <i class="pi pi-users"></i>
              <span>Total Users</span>
              <span class="count">{{ countRegisteredUsers }}</span>
            </div>
          </div>
        </div>
        <div class="p-col-12 p-md-6 p-xl-3">
          <div class="highlight-box">
            <div class="initials" style="background-color: #ef6262; color: #a83d3b">
              <span>TC</span>
            </div>
            <div class="highlight-details">
              <i class="pi pi-user"></i>
              <span>Total Candidates</span>
              <span class="count">{{ countRegisteredCandidates }}</span>
            </div>
          </div>
        </div>
        <div class="p-col-12 p-md-6 p-xl-3">
          <div class="highlight-box">
            <div class="initials" style="background-color: #20d077; color: #038d4a">
              <span>TR</span>
            </div>
            <div class="highlight-details">
              <i class="pi pi-briefcase"></i>
              <span>Total Recruiters</span>
              <span class="count">{{ countRegisteredRecruiters }}</span>
            </div>
          </div>
        </div>
        <div class="p-col-12 p-md-6 p-xl-3">
          <div class="highlight-box">
            <div class="initials" style="background-color: #f9c851; color: #b58c2b">
              <span>OP</span>
            </div>
            <div class="highlight-details">
              <i class="pi pi-folder-open"></i>
              <span>Open Positions</span>
              <span class="count">{{ countRegisteredJobs }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-col-12 p-lg-4">
        <Panel header="ESCO Skills and Occupations Usage Overview" style="height: 100%">
          <ul class="activity-list">
            <li>
              <div class="p-d-flex p-jc-between p-ai-center p-mb-3">
                <h5 class="activity p-m-0">Occupations</h5>
                <div class="count">{{ countAllOccupations }}</div>
              </div>
              <ProgressBar :value=escoOccupationUsagePercentage :showValue="true"/>
            </li>
            <li>
              <div class="p-d-flex p-jc-between p-ai-center p-mb-3">
                <h5 class="activity p-m-0">Skills</h5>
                <div class="count" style="background-color: #f9c851">{{ countAllSkills }}</div>
              </div>
              <ProgressBar :value=escoSkillUsagePercentage :showValue="true"/>
            </li>
          </ul>
        </Panel>
      </div>

      <div class="p-col-12 p-lg-6">
        <div class="card">
          <h1 style="font-size: 16px"><strong>Recently opened positions</strong></h1>
          <DataTable
              :value=recentJobs
              class="p-datatable-customers"
              :rows="3"
              style="margin-bottom: 20px"
              :paginator="true"
          >
            <Column field="creationDate" header="Creation Date" :sortable="true">
              <template #body="slotProps">
                {{ new Date(slotProps.data.createdDate).toLocaleDateString('en-CA') }} <!--YYYY-MM-DD-->
              </template>
            </Column>
            <Column field="title" header="Title" :sortable="true">
              <template #body="slotProps">
                {{ slotProps.data.title }}
              </template>
            </Column>
            <Column>
              <template #header> View</template>
              <template #body="slotProps">
                <Button
                    icon="pi pi-external-link"
                    type="button"
                    class="p-button p-mr-2 p-mb-1"
                    @click="gotoLink(slotProps.data.id)"
                ></Button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <div class="p-col-12 p-lg-6">
        <div class="card">
          <Chart type="line" :data="lineData"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import Checkbox from 'primevue/checkbox';
import Panel from 'primevue/panel';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Chart from 'primevue/chart';
import ProgressBar from 'primevue/progressbar';

export default {
  props: {
    appContext: {
      type: Object,
      required: true,
    },
  },
  components: {
    ProgressBar,
    Checkbox,
    Panel,
    Dropdown,
    InputText,
    Button,
    Column,
    DataTable,
    Chart,
  },
  data() {
    return {
      countJobSkills: null,
      countJobOccupations: null,
      countCandidateSkills: null,
      countCandidateOccupations: null,
      countRegisteredUsers: null,
      countRegisteredCandidates: null,
      countRegisteredRecruiters: null,
      countRegisteredJobs: null,
      countAllOccupations: null,
      countAllSkills: null,
      escoOccupationUsagePercentage: null,
      escoSkillUsagePercentage: null,
      recentJobs: [],
      lineData: null,
    };
  },
  mounted() {
    this.fetchDataFromAPI();
  },
  methods: {
    gotoLink(jobId) {
      window.open(`/admin/jobs/${jobId}`, '_blank');
    },
    async fetchDataFromAPI() {
      this.appContext.api.get('/admin/statistics')
        .then((response) => {
          this.countJobSkills = response.data.countJobSkills;
          this.countJobOccupations = response.data.countJobOccupations;
          this.countCandidateSkills = response.data.countCandidateSkills;
          this.countCandidateOccupations = response.data.countCandidateOccupations;
          this.countRegisteredUsers = response.data.countRegisteredUsers;
          this.countRegisteredCandidates = response.data.countRegisteredCandidates;
          this.countRegisteredRecruiters = response.data.countRegisteredRecruiters;
          this.countRegisteredJobs = response.data.countRegisteredJobs;
          this.countAllOccupations = response.data.countAllOccupations;
          this.countAllSkills = response.data.countAllSkills;
          this.escoOccupationUsagePercentage = response.data.escoOccupationUsagePercentage;
          this.escoSkillUsagePercentage = response.data.escoSkillUsagePercentage;
          this.recentJobs = response.data.recentJobs;
          this.lineData = {
            labels: response.data.lineData.labels,
            datasets: [
              {
                label: 'Registered Users',
                data: response.data.lineData.registeredUsers,
                fill: false,
                backgroundColor: '#2f4860',
                borderColor: '#2f4860',
              },
              {
                label: 'Registered Candidates',
                data: response.data.lineData.registeredCandidates,
                fill: false,
                backgroundColor: '#00bb7e',
                borderColor: '#00bb7e',
              },
              {
                label: 'Registered Recruiters',
                data: response.data.lineData.registeredRecruiters,
                fill: false,
                backgroundColor: '#f9c851',
                borderColor: '#f9c851',
              },
              {
                label: 'Open Positions',
                data: response.data.lineData.openJobs,
                fill: false,
                backgroundColor: '#007be5',
                borderColor: '#007be5',
              },
            ],
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 976px) and (max-width: 65rem) {
  ::v-deep(.p-datatable) {
    &.p-datatable-customers {
      .p-datatable-thead > tr > th,
      .p-datatable-tfoot > tr > td {
        display: none !important;
      }

      .p-datatable-tbody > tr {
        border-bottom: 1px solid #dee2e6;

        > td {
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0 none !important;
          width: 100% !important;
          float: left;
          clear: left;
          border: 0 none;

          .p-column-title {
            padding: 0.4rem;
            min-width: 30%;
            display: inline-block;
            margin: -0.4rem 1rem -0.4rem -0.4rem;
            font-weight: bold;
          }

          .p-progressbar {
            margin-top: 0.5rem;
          }
        }
      }
    }
  }
}

$fontSize: 14px;
$bodyBgColor: #edf0f5;
$textColor: #333333;
$textSecondaryColor: #707070;
$borderRadius: 3px;
$dividerColor: #e3e3e3;
$transitionDuration: 0.2s;
$maskBgColor: #424242;
$focusShadowColor: #8dcdff;

/* Menu Common */
$menuitemBadgeBgColor: #007be5;
$menuitemBadgeColor: #ffffff;
$submenuFontSize: 13px;
$menuitemActiveRouteColor: #1fa1fc;

/* Menu Light */
$menuBgColorFirst: #f3f4f9;
$menuBgColorLast: #d7dbe8;
$menuitemColor: #232428;
$menuitemHoverColor: #0388e5;
$menuitemActiveColor: #0388e5;
$menuitemActiveBgColor: #ffffff;
$menuitemBorderColor: rgba(207, 211, 224, 0.6);

/* Menu Dark */
$menuDarkBgColorFirst: #4d505b;
$menuDarkBgColorLast: #3b3e47;
$menuitemDarkColor: #ffffff;
$menuitemDarkHoverColor: #0388e5;
$menuitemDarkActiveColor: #0388e5;
$menuitemDarkActiveBgColor: #2e3035;
$menuitemDarkBorderColor: rgba(52, 56, 65, 0.6);

/* Topbar */
$topbarLeftBgColor: #0388e5;
$topbarRightBgColor: #07bdf4;
$topbarItemBadgeBgColor: #ef6262;
$topbarItemBadgeColor: #ffffff;
$topbarItemColor: #ffffff;
$topbarItemHoverColor: #c3e8fb;
$topbarSearchInputBorderBottomColor: #ffffff;
$topbarSearchInputColor: #ffffff;

.card {
  background-color: #ffffff;
  padding: 1em;
  margin-bottom: 16px;
  border-radius: $borderRadius;

  &.card-w-title {
    padding-bottom: 2em;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 1.5rem 0 1rem 0;
  font-family: inherit;
  font-weight: normal;
  line-height: 1.2;
  color: inherit;

  &:first-child {
    margin-top: 0;
  }
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.75rem;
}

h4 {
  font-size: 1.5rem;
}

h5 {
  font-size: 1.25rem;
}

h6 {
  font-size: 1rem;
}

@mixin icon-override($icon) {
  &:before {
    content: $icon;
  }
}

@mixin linear-gradient($top, $bottom) {
  background: $top; /* Old browsers */
  background: linear-gradient(to bottom, $top 0%, $bottom 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#000000', GradientType=0); /* IE6-9 */
}

@mixin linear-gradient-left($left, $right) {
  background: $left; /* Old browsers */
  background: linear-gradient(to right, $left 0%, $right 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=$left, endColorstr=$right, GradientType=1); /* IE6-9 */
}

@mixin opacity($opacity) {
  opacity: $opacity;
  $opacity-ie: $opacity * 100;
  filter: alpha(opacity=$opacity-ie);
}

@mixin focused() {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 0.2em $focusShadowColor;
}

@mixin focused-inset() {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: inset 0 0 0 0.2em $focusShadowColor;
}

@mixin clearfix {
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

mark {
  background: #fff8e1;
  padding: 0.25rem 0.4rem;
  border-radius: $borderRadius;
  font-family: monospace;
}

blockquote {
  margin: 1rem 0;
  padding: 0 2rem;
  border-left: 4px solid #90a4ae;
}

hr {
  border-top: solid $dividerColor;
  border-width: 1px 0 0 0;
  margin: 1rem 0;
}

p {
  margin: 0 0 1rem 0;
  line-height: 1.5;

  &:last-child {
    margin-bottom: 0;
  }
}

/* Code Highlight */
.docs {
  pre[class*='language-'] {
    padding: 0 !important;
    background: transparent;
    overflow: visible;

    > code {
      border-left: 0 none;
      box-shadow: none !important;
      font-size: 14px;
    }
  }
}

/* Footer */
$footerBgColor: #ffffff;
.dashboard {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica,
  Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  background-color: #edf0f5;
  min-width: 976px;
  max-width: 65rem;

  .two-column-layout {
    display: flex;
    flex-wrap: wrap;
  }

  .two-column-layout > .p-col-12 {
    flex: 1 1 50%; /* Each child takes up 50% of the container's width */
    box-sizing: border-box;
    padding: 0.3rem;
  }

  .summary {
    position: relative;

    .title {
      font-size: 20px;
    }

    .detail {
      color: $textSecondaryColor;
      display: block;
      margin-top: 10px;
    }

    .count {
      color: #ffffff;
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 24px;
      padding: 7px 14px;
      border-radius: $borderRadius;

      &.jobSkills {
        background-color: #20d077;
      }

      &.jobOccupations {
        background-color: #f9c851;
      }

      &.candidateSkills {
        background-color: #007be5;
      }

      &.candidateOccupations {
        background-color: #282889;
      }
    }
  }

  .highlight-box {
    height: 100px;
    display: flex;
    @include clearfix();

    .initials {
      height: 100%;
      width: 50%;
      text-align: center;
      padding: 1em;

      > span {
        font-size: 48px;
      }
    }

    .highlight-details {
      height: 100%;
      background-color: #ffffff;
      width: 50%;
      padding: 1em;

      i {
        font-size: 18px;
        vertical-align: middle;
        margin-right: 0.5em;
      }

      .count {
        color: $textSecondaryColor;
        font-size: 36px;
        margin-top: 4px;
        display: block;
      }
    }
  }

  .task-list {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      padding: 0.5em 0.25em;
      border-bottom: 1px solid $dividerColor;
      @include clearfix();
    }

    .p-checkbox {
      vertical-align: middle;
      margin-right: 0.5em;
    }

    .task-name {
      vertical-align: middle;
    }

    i {
      float: right;
      font-size: 24px;
      color: $textSecondaryColor;
    }

    .p-panel-content {
      min-height: 256px;
    }
  }

  .contact-form {
    .p-panel-content {
      min-height: 256px;
    }
  }

  .contacts {
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;

      li {
        border-bottom: 1px solid $dividerColor;

        button {
          padding: 9px;
          width: 100%;
          box-sizing: border-box;
          text-decoration: none;
          position: relative;
          display: block;
          border-radius: 2px;
          transition: background-color 0.2s;

          .name {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 18px;
          }

          .email {
            position: absolute;
            right: 10px;
            top: 30px;
            font-size: 14px;
            color: $textSecondaryColor;
          }

          &:hover {
            cursor: pointer;
            background-color: #eeeeee;
          }
        }

        &:last-child {
          border: 0;
        }
      }
    }

    .p-panel-content {
      min-height: 256px;
    }
  }

  .activity-list {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      border-bottom: 1px solid $dividerColor;
      padding: 16px 8px;

      .count {
        font-size: 24px;
        color: #ffffff;
        background-color: #007be5;
        font-weight: 700;
        padding: 0.25em 0.5em;
        display: inline-block;
        border-radius: $borderRadius;
      }
    }
  }
}
</style>
