<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-xl text-center">
        <h2 class="text-lg font-semibold leading-8 tracking-tight text-primary-600">Testimonials</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">See what our customers are saying</p>
      </div>
      <div class="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
        <div class="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
          <div v-for="(testimonial,index) in testimonials" :key="index" class="pt-8 sm:inline-block sm:w-full sm:px-4">
            <figure class="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
              <blockquote class="text-gray-900">
                <p>{{ `“${testimonial.body}”` }}</p>
              </blockquote>
              <figcaption class="mt-6 flex items-center gap-x-4">
                <img class="h-10 w-10 rounded-full bg-gray-50" :src="testimonial.author.imageUrl" alt="" />
                <div>
                  <div class="font-semibold text-gray-900">{{ testimonial.author.name }}</div>
                  <div class="text-yellow-500">
                    <span v-for="star in 5" :key="star">★</span>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const testimonials = [
  {
    body: 'The best coffee I have ever tasted. It’s rich and full of flavor!',
    author: {
      name: 'John Doe',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
  {
    body: 'Absolutely love this coffee! It’s my morning go-to.',
    author: {
      name: 'Jane Smith',
      imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
  },
  {
    body: 'The aroma and taste are unmatched. Highly recommend!',
    author: {
      name: 'Samuel Green',
      imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
  },
  {
    body: 'Fantastic quality and superb taste. This coffee is a game-changer.',
    author: {
      name: 'Lisa Brown',
      imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  },
  {
    body: 'I can’t get enough of this coffee. It’s simply the best!',
    author: {
      name: 'Michael Johnson',
      imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
  },
  {
    body: 'A delightful experience with every cup. Exceptional coffee!',
    author: {
      name: 'Emily Davis',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
  },
];
</script>
