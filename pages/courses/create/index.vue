<template>
  <div class="min-h-screen mb-12">
    <section class="bg-orange-100">
      <div class="container sm:mx-0 lg:mx-auto px-4 lg:px-0">
        <div class="grid grid-cols-12 gap-5">
          <!-- Left Add Image -->
          <div class="col-span-full lg:col-span-7 xl:col-span-8">
            <section>
              <div
                class="switcher whitespace-no-wrap flex flex-row gap-10 place-items-start px-5 border-b-2 border-gray-200 overflow-scroll scrollbar-thumb-orange"
              >
                <button
                  @click="switcher(0)"
                  :class="{ active: isCourseSwitch === 0 }"
                  class="menu-btn"
                >
                  <p class="text-xs text-gray-700">Preliminary</p>
                </button>
                <button
                  @click="courseStates.lessons ? switcher(1) : null"
                  :class="{ active: isCourseSwitch === 1 }"
                  class="menu-btn"
                >
                  <p class="text-xs text-gray-700">Lessons</p>
                </button>
                <button
                  @click="courseStates.settings ? switcher(2) : null"
                  :class="{ active: isCourseSwitch === 2 }"
                  class="menu-btn"
                >
                  <p class="text-xs text-gray-700">Settings</p>
                </button>
              </div>
            </section>

            <!-- Preliminary -->
            <section v-if="isCourseSwitch === 0">
              <!-- Preliminary section -->
              <section>
                <div class="container mx-auto my-10 px-2 lg:px-0">
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12">
                      <dash-items-section-group
                        title="Preliminary"
                        :edit="false"
                      >
                        <div
                          class="bg-white rounded-xl border border-gray-300 shadow-hover relative h-full"
                        >
                          <div class="px-4 md:px-5 lg:px-6 py-4">
                            <!-- course name -->
                            <div class="form-group mb-5">
                              <label for="input-name">Course name</label>
                              <div>
                                <input
                                  id="input-name"
                                  type="text"
                                  class="form-input"
                                  placeholder="Enter course name here"
                                  v-model="createCourse.title"
                                />
                              </div>
                            </div>
                            <!-- course subtitle -->
                            <div class="form-group mb-5">
                              <label for="input-name">Course subtitle</label>
                              <div>
                                <input
                                  id="input-name"
                                  type="text"
                                  class="form-input"
                                  placeholder="Enter course subtitle here"
                                  v-model="createCourse.subtitle"
                                />
                              </div>
                            </div>
                            <div class="form-group mb-5">
                              <label for="input-name"
                                >Course introduction</label
                              >
                              <div>
                                <input
                                  id="input-name"
                                  type="text"
                                  class="form-input"
                                  placeholder="Enter course introduction here"
                                  v-model="createCourse.introductory_text"
                                />
                              </div>
                            </div>
                            <div class="form-group">
                              <label for="input-name">Introductory video</label>
                              <div
                                v-if="!videoUploading"
                                class="relative h-full"
                              >
                                <input
                                  ref="input"
                                  type="file"
                                  name="image"
                                  accept="video/*"
                                  multiple
                                  @change="setIntroVideo"
                                />
                                <div class="py-2">
                                  <!-- introductory name -->
                                  <resource-chip
                                    v-for="(item,
                                    key) in createCourse.introductory_video_file
                                      ? [
                                          ...createCourse.introductory_video_file,
                                        ]
                                      : []"
                                    :key="key"
                                    :file="{
                                      filename: item.name,
                                      type: 'intro_video',
                                    }"
                                    :id="key"
                                    :deleteItem="deleteResItem"
                                  />
                                  <div
                                    class="container flex flex-row bg-white rounded-lg border border-gray-300 shadow-hover mb-5"
                                  >
                                    <div
                                      class="flex flex-row justify-center items-center w-full p-4 cursor-pointer"
                                      @click.prevent="showFileChooser"
                                    >
                                      <div>
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M9.375 7.44601H11.107V15.3749C11.107 15.478 11.1914 15.5624 11.2945 15.5624H12.7008C12.8039 15.5624 12.8883 15.478 12.8883 15.3749V7.44601H14.625C14.782 7.44601 14.8687 7.26554 14.7727 7.14367L12.1477 3.82023C12.1301 3.79782 12.1077 3.7797 12.0821 3.76723C12.0565 3.75477 12.0285 3.74829 12 3.74829C11.9715 3.74829 11.9435 3.75477 11.9179 3.76723C11.8923 3.7797 11.8699 3.79782 11.8523 3.82023L9.22734 7.14133C9.13125 7.26555 9.21797 7.44601 9.375 7.44601ZM20.5781 14.6718H19.1719C19.0688 14.6718 18.9844 14.7562 18.9844 14.8593V18.4687H5.01562V14.8593C5.01562 14.7562 4.93125 14.6718 4.82812 14.6718H3.42188C3.31875 14.6718 3.23438 14.7562 3.23438 14.8593V19.4999C3.23438 19.9148 3.56953 20.2499 3.98438 20.2499H20.0156C20.4305 20.2499 20.7656 19.9148 20.7656 19.4999V14.8593C20.7656 14.7562 20.6812 14.6718 20.5781 14.6718Z"
                                            fill="black"
                                          />
                                        </svg>
                                      </div>
                                      <p
                                        class="text-sm text-center font-thin text-gray-700 pl-3"
                                      >
                                        Click here to upload an introductory
                                        video
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <loader-2 v-else />
                            </div>
                            <div class="form-group mb-5">
                              <label for="input-name">Tutor Email</label>
                              <div>
                                <input
                                  id="input-name"
                                  type="email"
                                  class="form-input"
                                  placeholder="Tutor email"
                                  v-model="createCourse.tutor_email"
                                />
                              </div>
                            </div>
                            <div class="form-group mb-5">
                              <label for="input-name">Course category</label>
                              <v-select
                                class="form-input style-chooser cursor-pointer capitalize"
                                placeholder="Select course category"
                                multiple
                                v-model="selected"
                                @input="setSelected"
                                label="categoryName"
                                :options="courseCategory.data"
                              />
                            </div>
                            <div class="form-group mb-5">
                              <label for="input-name">Tags</label>
                              <div>
                                <input
                                  id="input-name"
                                  type="text"
                                  class="form-input"
                                  placeholder="Enter tags"
                                  v-model="newTag"
                                />
                                <button
                                  type="button"
                                  @click="addTag"
                                  class="btn btn-sm lg:mt-3 btn-primary"
                                >
                                  Add tag
                                </button>
                                <div class="mt-3 flex">
                                  <p
                                    class="mr-2"
                                    v-for="(tag, key) in createCourse.tags"
                                    :key="key"
                                  >
                                    {{ tag
                                    }}<sup
                                      class="ml-1 rounded inline cursor-pointer bg-red-500 p-1 text-white"
                                      style="font-size: 0.5rem"
                                      @click="removeTag(key)"
                                      >X</sup
                                    >
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div
                              v-for="(item,
                              index) in createCourse.course_benefits"
                              :key="index"
                            >
                              <div class="form-group mb-5">
                                <div class="flex">
                                  <label for="input-name"
                                    >Course benefits title</label
                                  >
                                  <img
                                    class="w-4 h-4 inline ml-3 mb-1 cursor-pointer"
                                    @click="remove(index)"
                                    v-show="
                                      index ||
                                      (!index &&
                                        createCourse.course_benefits.length > 1)
                                    "
                                    src="/icon/delete.svg"
                                  />
                                </div>
                                <input
                                  v-model="item.title"
                                  id="input-name"
                                  type="text"
                                  class="form-input"
                                  placeholder="Enter course benefit title here"
                                />
                              </div>
                              <div class="form-group mb-5">
                                <label for="input-name"
                                  >Course benefits description</label
                                >
                                <textarea
                                  v-model="item.description"
                                  id="input-name"
                                  type="text"
                                  class="form-input"
                                  placeholder="Enter course benefit description here"
                                />
                              </div>
                              <div
                                @click="add(index)"
                                v-show="
                                  index ==
                                  createCourse.course_benefits.length - 1
                                "
                                class="relative flex items-center justify-center my-10 cursor-pointer"
                              >
                                <hr class="w-full" />
                                <empty-chip :isAbsolute="true">
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clip-path="url(#clip0)">
                                      <path
                                        d="M-2.18262 8H7.99972V-2.18234"
                                        stroke="#8A8A8A"
                                        stroke-width="1.5"
                                      />
                                      <path
                                        d="M8 18.1821V7.99979H18.1823"
                                        stroke="#8A8A8A"
                                        stroke-width="1.5"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  <p
                                    class="text-xs text-center font-thin text-gray-600 pl-2"
                                  >
                                    Add more course benefits
                                  </p>
                                </empty-chip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </dash-items-section-group>
                    </div>
                  </div>
                </div>
              </section>
            </section>

            <!-- Course Part -->

            <section v-if="isCourseSwitch === 1">
              <section>
                <div class="container mx-auto my-10 px-2 lg:px-0">
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12">
                      <!-- Part 1 -->
                      <dash-items-section-group title="Lessons" :edit="false">
                        <!-- course part -->
                        <div
                          class="bg-white rounded-xl border border-gray-300 shadow-hover relative h-full items-center mb-8"
                        >
                          <course-chip
                            v-for="(item, key) in courseParts"
                            :key="key"
                            :id="key"
                            :item="item"
                            :deleteItem="removePart"
                            :courseParts="courseParts"
                            :checkFormError="checkFormError"
                            :showFileChooser="showFileChooser"
                          />
                        </div>

                        <div class="relative flex items-center justify-center">
                          <div
                            class="btn btn-primary absolute flex flex-row bottom-0 mb-2"
                            @click="addLessonPart"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0)">
                                <path
                                  d="M-2.18262 8H7.99972V-2.18234"
                                  stroke="#FFFFFF"
                                  stroke-width="1.5"
                                />
                                <path
                                  d="M8 18.1821V7.99979H18.1823"
                                  stroke="#FFFFFF"
                                  stroke-width="1.5"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            <p
                              class="text-sm text-center font-thin text-white pl-2"
                            >
                              Create part
                            </p>
                          </div>
                        </div>

                        <span
                          v-if="coursePartsError"
                          class="text-sm text-red-700"
                          >Fill all lessons input field</span
                        >
                      </dash-items-section-group>

                      <div class="mb-8"></div>
                    </div>
                  </div>
                </div>
              </section>
            </section>

            <!-- settings -->
            <section class="mt-5" v-if="isCourseSwitch === 2">
              <dash-items-section-group
                title="Graduation Criteria"
                :edit="false"
              >
                <div
                  class="bg-white rounded-xl border border-gray-300 shadow-hover relative h-full"
                >
                  <div class="px-4 md:px-5 lg:px-6 py-4">
                    <div class="border-b border-gray-300 pb-5 mb-4">
                      <p class="text-base font-bold text-gray-700 mb-3">
                        Course completion
                      </p>
                      <div class="grid grid-cols-12 mb-3">
                        <div class="col-span-7">
                          <p class="text-sm text-gray-700">
                            All lessons must be completed
                          </p>
                        </div>
                        <div class="col-span-5 text-right">
                          <input-toggle-switch v-model="graduation.allCourse" />
                        </div>
                      </div>
                      <div class="grid grid-cols-12">
                        <div class="col-span-7">
                          <p class="text-sm text-gray-700">
                            Students must complete at least
                          </p>
                        </div>
                        <div class="col-span-5 text-right">
                          <input
                            :disabled="graduation.allCourse === true"
                            type="number"
                            class="form-input"
                            placeholder="70% of lessons"
                            v-model.number="graduation.courseCompletion"
                          />
                        </div>
                      </div>
                    </div>
                    <!-- Assignment -->
                    <div class="border-b border-gray-300 pb-5 mb-4">
                      <p class="text-base font-bold text-gray-700 mb-3">
                        Assignment
                      </p>
                      <div class="grid grid-cols-12">
                        <div class="col-span-7 my-auto">
                          <p class="text-sm text-gray-700">
                            All assignments are compulsory
                          </p>
                        </div>
                        <div class="col-span-5 text-right">
                          <input-toggle-switch
                            v-model="graduation.allAssignment"
                          />
                        </div>
                      </div>
                      <div class="grid grid-cols-12 mt-4">
                        <div class="col-span-7">
                          <p class="text-sm text-gray-700">
                            Students must submit at least
                          </p>
                        </div>
                        <div class="col-span-5 text-right">
                          <input
                            :disabled="graduation.allAssignment === true"
                            type="number"
                            class="form-input"
                            placeholder="70% of assignments"
                            v-model.number="graduation.assignmentCompletion"
                          />
                        </div>
                      </div>
                    </div>
                    <!-- Certificate -->
                    <div class="border-b border-gray-300 pb-5 mb-4">
                      <p class="text-base font-bold text-gray-700 mb-3">
                        Certificate
                      </p>
                      <div class="grid grid-cols-12">
                        <div class="col-span-7 lg:col-span-8 my-auto">
                          <p class="text-sm text-gray-700">
                            Automatically generate certificate
                          </p>
                        </div>
                        <div class="col-span-5 lg:col-span-4 text-right">
                          <input-toggle-switch
                            v-model="graduation.generateCertificate"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </dash-items-section-group>

              <dash-items-section-group
                class="mt-8"
                title="Pricing"
                :edit="false"
              >
                <div
                  class="bg-white rounded-xl border border-gray-300 shadow-hover relative h-full"
                >
                  <div class="px-4 md:px-5 lg:px-6 py-4">
                    <div class="border-b border-gray-300 pb-5 mb-4">
                      <p class="text-base font-bold text-gray-700 mb-3">
                        Enter course price
                      </p>
                      <div class="grid grid-cols-12 mb-3">
                        <div class="col-span-7">
                          <p class="text-sm text-gray-700">
                            Price in US Dollars
                          </p>
                        </div>
                        <div
                          class="form-input px-4 currency-box flex flex-row text-center justify-center items-center"
                        >
                          <p
                            class="text-sm font-bold text-gray-600 text-center py-1"
                          >
                            $
                          </p>
                          <input
                            type="number"
                            class="currency-input"
                            placeholder="price"
                            v-model="price"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </dash-items-section-group>
              <dash-items-section-group
                class="mt-5"
                title="Promotion"
                :edit="false"
              >
                <div
                  class="bg-white rounded-xl border border-gray-300 shadow-hover relative h-full items-center mb-8"
                >
                  <div class="px-4 md:px-5 lg:px-6 py-4">
                    <!-- promotion -->
                    <div class="form-group mb-5">
                      <p class="text-sm text-left font-bold text-gray-800">
                        Price off
                      </p>
                      <div class="flex flex-row justify-between my-4">
                        <div class="col-span-7">
                          <p class="text-sm text-gray-700">
                            Run price off promotion
                          </p>
                        </div>
                        <div class="col-span-5 text-right">
                          <input-toggle-switch
                            v-model="promo.runPricePromotion"
                          />
                        </div>
                      </div>
                      <div class="flex flex-row justify-between my-4">
                        <div
                          class="flex col-span-7 items-center justify-center"
                        >
                          <p class="text-sm text-gray-700 text-center">
                            Reduce price by
                          </p>
                        </div>

                        <div
                          class="px-3 form-input currency-box flex flex-row text-center justify-center items-center"
                        >
                          <input
                            type="number"
                            class="currency-input"
                            placeholder="price"
                            v-model="promo.percentageOff"
                          />
                        </div>
                      </div>

                      <div class="flex flex-row justify-between my-4">
                        <div
                          class="flex col-span-7 items-center justify-center"
                        >
                          <p class="text-sm text-gray-700 text-center">
                            Starting from
                          </p>
                        </div>

                        <div
                          class="form-input currency-box flex flex-row text-center justify-center items-center"
                        >
                          <input
                            type="date"
                            class="promotion-input"
                            placeholder="date"
                            v-model="promo.startDate"
                          />
                        </div>
                      </div>

                      <div class="flex flex-row justify-between my-4">
                        <div
                          class="flex col-span-7 items-center justify-center"
                        >
                          <p class="text-sm text-gray-700 text-center">Until</p>
                        </div>

                        <div
                          class="form-input currency-box flex flex-row text-center justify-center items-center"
                        >
                          <input
                            type="date"
                            class="promotion-input"
                            placeholder="date"
                            v-model="promo.endDate"
                          />
                        </div>
                      </div>
                    </div>
                    <hr class="mb-5" />
                  </div>
                </div>
              </dash-items-section-group>
            </section>

            <!-- End for Switchers -->
          </div>
          <!-- Right Add Image -->
          <div
            v-if="isCourseSwitch !== 0"
            class="col-span-full lg:col-span-5 xl:col-span-4"
          >
            <div
              class="bg-white rounded-xl border border-gray-300 shadow-hover relative min-h-full"
            >
              <div class="block mb-2">
                <div
                  class="big-avatar h-64 relative rounded-xl overflow-hidden"
                  :style="{
                    backgroundImage: preview.image
                      ? `url(${preview.image.signedUrl})`
                      : `url('/webinar-view-bg.jpg')`,
                  }"
                >
                  <div
                    class="w-full h-full bg-black opacity-50 absolute top-0"
                  ></div>
                </div>
              </div>
              <div class="px-4 md:px-5 lg:px-6 py-4">
                <ul class="text-gray-700">
                  <li class="text-left">
                    <h5 class="font-bold mb-2">{{ course.title }}</h5>
                    <p class="text-xs text-gray-700">
                      {{ course.introductoryText }}
                    </p>
                  </li>
                  <hr class="my-5" />
                  <!-- <li class="lg:pb-8 flex flex-row justify-between">
                    <span class="text-sm">Link: https://klasro..</span>

                    <div class="flex items-center mr-5 mb-3 cursor-pointer">
                      <img class="w-6 h-4" src="/icon/copy.svg" />
                      <span class="text-xs">Copy</span>
                    </div>
                  </li> -->
                  <li class="lg:pb-8 flex flex-row justify-between relative">
                    <button
                      v-if="courseStates.settings"
                      class="btn btn-primary mr-5 flex flex-row justify-between align-middle items-center"
                      @click="publishOpt = !publishOpt"
                    >
                      <span class="text-xs">Publish</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      v-if="publishOpt"
                      class="pop-up flex flex-col gap-5 items-start px-4 py-5 justify-around pop-up absolute top-0 left-0 mt-12 ml-5 border-gray-500 bg-white rounded-lg shadow-lg"
                      :style="{ zIndex: 3 }"
                    >
                      <span
                        @click="goNext(2)"
                        class="pop-up-item lg:mr-0 md:text-gray-700 text-left text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
                      >
                        <p>Publish now</p>
                      </span>
                      <a
                        href="#"
                        class="pop-up-item lg:mr-0 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
                      >
                        <p>Schedule for later</p>
                      </a>
                    </div>
                    <button
                      @click="$router.push(`/course/preview/${course.id}`)"
                      class="btn btn-light"
                    >
                      <span class="text-xs">Preview </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div v-else class="col-span-full lg:col-span-5 xl:col-span-4">
            <div
              class="bg-white rounded-xl border border-gray-300 shadow-hover relative min-h-full"
            >
              <div class="block mb-2">
                <div
                  class="big-avatar h-64 relative rounded-xl overflow-hidden"
                  :style="{
                    backgroundImage: preview.image
                      ? `url(${preview.image.signedUrl})`
                      : `url('/webinar-view-bg.jpg')`,
                  }"
                >
                  <div class="grid grid-cols-12 place-items-center h-64 py-32">
                    <div
                      class="change-picture col-span-12 text-white mx-auto my-auto"
                    >
                      <input
                        ref="image"
                        type="file"
                        name="image"
                        accept="image/*"
                        multiple
                        @change="setcourseImage"
                      />
                      <button
                        v-if="!uploading"
                        @click.prevent="showFileChooser('courseImage')"
                        class="focus:outline-none"
                      >
                        Add Picture
                      </button>
                      <loader v-else color="white" />
                    </div>
                  </div>
                  <div
                    class="w-full h-full bg-black opacity-50 absolute top-0"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom navigation -->
          <div class="col-span-full lg:col-span-7 xl:col-span-8">
            <hr class="my-5" />
            <div class="flex flex-row justify-between">
              <button
                class="btn btn-sm lg:mt-0"
                :class="isCourseSwitch === 0 ? 'btn-disable' : 'btn-primary'"
                @click="
                  isCourseSwitch <= 0 ? null : switcher(isCourseSwitch - 1)
                "
              >
                Previous
              </button>
              <button
                v-if="isCourseSwitch !== 2"
                class="btn btn-sm lg:mt-0 btn-primary"
                @click="
                  () => {
                    goNext(isCourseSwitch)
                  }
                "
              >
                Next
                <loader v-if="loading" color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
import UserChip from '~/components/chip/UserChip.vue'
import { getAccessTokenHeader } from '~/utils'
// import PollChip from '~/components/chip/PollChip.vue'

const courses = require('@/static/json/courses.json')

export default {
  components: { UserChip },
  layout: 'dashboard',
  middleware: ['check-auth', 'auth'],
  fetch({ store }) {
    store.commit('app/SET_TITLE', 'Create Course')
  },
  data: () => ({
    courses: _.take(courses, 4),
    undoneTasks: _.take(courses, 3),
    videoUploading: false,

    content: '',
    selected: [],

    course: null,
    lessons: null,
    settingId: null,
    // course: {
    //   id: 9966490,
    // },
    graudationId: null,
    priceId: null,
    promotionId: null,

    courseStates: {
      prem: false,
      lessons: false,
      settings: false,
    },
    uploading: false,
    isCourseSwitch: 0,
    createCourse: {
      title: null,
      subtitle: null,
      introductory_text: null,
      introductory_video: null,
      introductory_video_file: null,
      tutor_email: null,
      category_ids: [],
      tags: [],
      image: null,
      course_benefits: [
        {
          title: '',
          description: '',
        },
      ],
    },
    preview: {
      image: null,
    },
    newTag: '',
    categoryArray: [],
    courseParts: [
      {
        part: '',
        lessons: [
          {
            lesson: '',
            description: '',
            content: '',
          },
          {
            lesson: '',
            description: '',
            content: '',
          },
        ],
      },
    ],
    //graudation
    graduation: {
      allCourse: false,
      courseCompletion: null,
      allAssignment: false,
      assignmentCompletion: null,
      generateCertificate: false,
    },
    //pricing
    price: 0,
    //promotion
    promo: {
      percentageOff: 0,
      startDate: '',
      endDate: '',
      runPricePromotion: false,
    },
    runPricePromotion: false,
    coursePartsError: false,
    publishOpt: false,
    loading: false,
    fileResources: [],
    linkResources: [],
  }),
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      token: (state) => state.auth.token,
      courseCategory: (state) => state.courses.courseCategory,
      userType: (state) =>
        state.auth.user && state.auth.user.isTutor ? 'tutor' : 'student',
    }),
  },
  watch: {
    async fileResources(value) {
      console.log('fileResources: ', value)
      // await this.$nextTick()
    },
    async runPricePromotion(value) {
      console.log('runPricePromotion: ', value)
      // await this.$nextTick()
    },
    async courseParts(value) {
      console.log('courseParts: ', value)
    },
  },
  async mounted() {
    await this.getCourseCategory()
  },
  methods: {
    async publishCourse() {
      try {
        if (this.course) {
          const resData = {
            title: this.course.title,
            subtitle: this.createCourse.subtitle,
            introductory_text: this.course.introductoryText,
            introductory_video: this.course.introductoryVideo.publicUrl,
            tags: this.course.tags,
            category_ids: this.createCourse.category_ids,
            tutor_email: this.createCourse.tutor_email,
            image: this.course.image,
            course_benefits: this.createCourse.course_benefits,
          }
          console.log('publishCourse: ', resData)
          const { data, message } = await this.$axios.$put(
            `https://api.staging.klasroom.com/v1/courses/${
              this.course.id
            }?publish_now=${true}`,
            resData,
            {
              headers: getAccessTokenHeader(this.token),
            }
          )

          Swal.fire({
            position: 'top-end',
            width: '350px',
            text: message,
            backdrop: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            showCloseButton: true,
            timer: 3000,
          })

          console.log('course data: ', data, message)

          // Publish action
          this.gotoCourses()
        }
      } catch (e) {
        console.log(e)
        return
      }
    },
    gotoCourses(type) {
      this.$router.push(`/courses`)
    },
    addTag() {
      this.createCourse.tags.push('#' + this.newTag)
      this.newTag = ''
    },
    removeTag(id) {
      this.createCourse.tags = this.createCourse.tags.filter(
        (i, index) => index !== id
      )
    },
    saveContent() {
      console.log(this.content)
    },
    async getCourseCategory() {
      try {
        await this.$store.dispatch('courses/getCourseCategory')
      } catch (error) {
        console.log(error)
      }
    },
    setSelected() {
      this.selected.forEach((val) => {
        this.categoryArray.push(val.categoryId)
        const newData = new Set(this.categoryArray)
        const result = [...newData]
        this.createCourse.category_ids = result
        console.log(this.createCourse.category_ids)
      })
    },
    switcher: function (value) {
      this.isCourseSwitch = value
      // some code to filter users
    },
    togglePubOptMenu() {
      this.publishOpt = !this.publishOpt
    },
    callLog() {
      console.log('adding new')
    },
    add(index) {
      this.createCourse.course_benefits.push({
        title: '',
        description: '',
      })
    },
    remove(index) {
      this.createCourse.course_benefits.splice(index, 1)
    },
    async goNext(isCourseSwitch) {
      switch (isCourseSwitch) {
        case 0:
          try {
            this.loading = true
            const { image } = this.createCourse
            const resData = {
              ...this.createCourse,
              courseImage: image ? image : '',
            }
            console.log('resData: ', resData)

            let newData

            if (this.course) {
              const { data } = await this.$axios.$put(
                `https://api.staging.klasroom.com/v1/courses/${
                  this.course.id
                }?publish_now=${false}`,
                resData,
                {
                  headers: getAccessTokenHeader(this.token),
                }
              )
              newData = data
            } else {
              const { data } = await this.$axios.$post(
                `https://api.staging.klasroom.com/v1/courses?publish_now=${false}`,
                resData,
                {
                  headers: getAccessTokenHeader(this.token),
                }
              )
              newData = data
            }

            console.log('course data: ', newData)
            this.course = newData
            this.loading = false
            this.courseStates.lessons = true
            isCourseSwitch >= 2 ? null : this.switcher(isCourseSwitch + 1)
            window.scrollTo(0, 0)
          } catch (e) {
            console.log(e)
            this.loading = false
            return
          }
          break
        case 1:
          this.loading = true
          try {
            this.courseParts.map((i) => {
              if (!i.part) {
                this.coursePartsError = true
                return
              }

              i.lessons.map((j) => {
                if (!j.lesson || !j.description || !j.content) {
                  this.coursePartsError = true
                  return
                }
              })
            })

            if (!this.coursePartsError) {
              const resData = {
                courseId: this.course.id,
                courseParts: [...this.courseParts],
              }

              console.log('resData: ', resData)

              let newData

              if (this.lessons) {
                const { data } = await this.$axios.$put(
                  `https://api.staging.klasroom.com/v1/courses/lessons/${this.lessons.id}`,
                  resData,
                  {
                    headers: getAccessTokenHeader(this.token),
                  }
                )
                newData = data
              } else {
                const { data } = await this.$axios.$post(
                  `https://api.staging.klasroom.com/v1/courses/lessons`,
                  resData,
                  {
                    headers: getAccessTokenHeader(this.token),
                  }
                )
                newData = data
              }

              console.log('Lessons newData: ', newData)

              this.lessons = newData

              this.courseStates.settings = true
              isCourseSwitch >= 2 ? null : this.switcher(isCourseSwitch + 1)
              window.scrollTo(0, 0)
            }
            this.loading = false
          } catch (error) {
            console.log(e)
            this.loading = false
            return
          }
          break
        case 2:
          this.loading = true
          try {
            const { startDate, endDate } = this.promo
            const resPromoData = {
              ...this.promo,
              isActive: this.promo.runPricePromotion,
              percentageOff: parseInt(this.promo.percentageOff),
              startDate: moment(startDate).format('YYYY-MM-DDTHH:mm:ss'),
              endDate: moment(endDate).format('YYYY-MM-DDTHH:mm:ss'),
            }

            if (this.graduationId) {
              const { data: graduationData } = await this.$axios.$post(
                `https://api.staging.klasroom.com/v1/courses/grad-criteria/${this.course.id}`,
                {
                  ...this.graduation,
                },
                {
                  headers: getAccessTokenHeader(this.token),
                }
              )
              this.graduationId = graduationData.id
            } else {
              const { data: graduationData } = await this.$axios.$post(
                `https://api.staging.klasroom.com/v1/courses/grad-criteria/${this.course.id}`,
                {
                  ...this.graduation,
                },
                {
                  headers: getAccessTokenHeader(this.token),
                }
              )
              this.graduationId = graduationData.id
            }
            if (this.priceId) {
              const { data: priceData } = await this.$axios.$post(
                `https://api.staging.klasroom.com/v1/courses/price/${this.course.id}`,
                {
                  price: this.price,
                },
                {
                  headers: getAccessTokenHeader(this.token),
                }
              )
              this.priceId = priceData.id
            } else {
              const { data: priceData } = await this.$axios.$post(
                `https://api.staging.klasroom.com/v1/courses/price/${this.course.id}`,
                {
                  price: this.price,
                },
                {
                  headers: getAccessTokenHeader(this.token),
                }
              )
              this.priceId = priceData.id
            }
            if (this.promo.runPricePromotion) {
              if (this.promotionId) {
                const { data: promotionData } = await this.$axios.$post(
                  `https://api.staging.klasroom.com/v1/courses/promotions/${this.course.id}`,
                  {
                    ...resPromoData,
                  },
                  {
                    headers: getAccessTokenHeader(this.token),
                  }
                )
                this.promotionId = promotionData.id
              } else {
                const { data: promotionData } = await this.$axios.$post(
                  `https://api.staging.klasroom.com/v1/courses/promotions/${this.course.id}`,
                  {
                    ...resPromoData,
                  },
                  {
                    headers: getAccessTokenHeader(this.token),
                  }
                )
                this.promotionId = promotionData.id
              }
            }

            this.loading = false

            this.publishCourse()
          } catch (e) {
            console.log(e)
            this.loading = false
            return
          }
          break
        default:
          break
      }
    },
    addLink(link) {
      this.linkResources = [...this.linkResources, link]
    },
    showAddLink() {
      this.$store.commit('app/ADD_LINK_MODAL', {
        status: true,
        addLink: this.addLink,
      })
    },
    showFileChooser(type) {
      if (type === 'courseImage') this.$refs.image.click()
      else this.$refs.input.click()
    },
    checkFormError(type) {
      if (type === 'lesson') this.coursePartsError = false
      else if (type === 'co_host') this.coHostFormError = false
    },
    async setcourseImage(e) {
      console.log('Uploading__')
      this.uploading = true
      const file = e.target.files[0]
      console.log('file: ', file)

      const formData = new FormData()
      formData.append('course_resources', file, '.' + file.type.split('/')[1])
      formData.append('file_path', 'course_introduction/image')
      try {
        this.uploading = true
        const { data, message } = await this.$axios.$post(
          `https://api.staging.klasroom.com/v1/uploads`,
          formData,
          {
            headers: getAccessTokenHeader(this.token),
          }
        )
        console.log('uploaded: ', message, data)

        this.createCourse.image = data.course_resources[0].fileName
        this.preview.image = data.course_resources[0]
        this.uploading = false
      } catch (e) {
        this.uploading = false
        console.log(e)
        return
      }
    },
    async setIntroVideo(e) {
      console.log('Uploading__')
      const file = e.target.files[0]
      console.log('file: ', file)

      const formData = new FormData()
      formData.append('course_resources', file)
      formData.append('file_path', 'course_introduction/video')
      try {
        this.videoUploading = true
        const { data, message } = await this.$axios.$post(
          `https://api.staging.klasroom.com/v1/uploads`,
          formData,
          {
            headers: getAccessTokenHeader(this.token),
          }
        )
        console.log('uploaded: ', message, data)
        this.createCourse.introductory_video_file = file
        this.createCourse.introductory_video = data.course_resources[0].fileName
        this.videoUploading = false
      } catch (e) {
        this.videoUploading = false
        console.log(e)
        return
      }
    },
    deleteResItem(id, type) {
      if (type === 'intro_video')
        this.createCourse.introductory_video_file = null
      if (type === 'link')
        this.linkResources = this.linkResources.filter(
          (i, index) => index !== id
        )
      else
        this.fileResources = this.fileResources.filter(
          (i, index) => index !== id
        )
    },
    addLessonPart() {
      this.courseParts = [
        ...this.courseParts,
        {
          part: '',
          lessons: [
            {
              lesson: '',
              description: '',
              content: '',
            },
            {
              lesson: '',
              description: '',
              content: '',
            },
          ],
        },
      ]
    },
    removePart(id) {
      this.courseParts = this.courseParts.filter((i, index) => index !== id)
    },
  },
}
</script>

<style scoped>
.promotion-input {
  padding: 0.1rem 0.1rem;
  border: none !important;
}
.percentage-chip {
  min-width: 4.1rem;
  padding: 0.1rem 0;
}
.currency-box {
  width: 16rem;
}
.currency-input {
  border: none !important;
  background: #f5f5f3 !important;
}
.switcher {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.switcher::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.big-avatar {
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  @apply bg-gray-200;
}
.change-picture {
  z-index: 1;
}
.change-picture > button {
  background-image: url('/icon/camera.svg');
  background-repeat: no-repeat;
  padding: 5px 5px 5px 32px;
  line-height: 20px;
}
.add-btn {
  padding: 2px;
  background: 'red';
}
.menu-btn {
  border-top: 5px solid;
  border-bottom: 5px solid;
  padding: 0.938rem 0;
  display: inline-block;
  border-color: transparent;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.menu-btn.active {
  border-bottom-color: #f99e42;
  font-weight: 700;
}
</style>
