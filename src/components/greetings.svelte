<script lang='ts'>
    const currentTime = new Date()
    const currentHour = currentTime.getHours()

    let greeting = ''

    if(currentHour < 12){
        greeting = 'Good Morning'
    }else if(currentHour < 18){
        greeting = 'Good Afternoon'
    }else{
        greeting = 'Good Night'
    }
</script>

<h2 class="text-5xl font-bold">{greeting}</h2>