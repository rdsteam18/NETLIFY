<div id="schedule-block">
                    <section class="block_area block_area_sidebar block_area-schedule schedule-full">
                        <div class="block_area-header">
                            <div class="float-left bah-heading mr-4">
                                <h2 class="cat-heading">Estimated Schedule</h2>
                            </div>
                            <div class="float-left bah-time">
                                <span class="current-time"><span id="timezone">(GMT+05:30)</span> <span
                                        id="current-date"><?=date("d")?>/<?=date("m")?>/<?=date("Y")?></span> <span
                                        id="clock"><?php echo date('h:i A');?></span></span>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="block_area-content">
                            <div class="table_schedule">
                                <div class="clearfix"></div>
                                <ul class="ulclear table_schedule-list limit-8">
                                    <?php 
                                $json = file_get_contents("https://api.consumet.org/meta/anilist/airing-schedule");
                                $json = json_decode($json, true);
                                foreach($json['results'] as $schedule) { ?>
                                    <?php $title = $schedule['title']; { ?>
                                    <li>
                                        <a href="<?=$websiteUrl?>/anilist/anime?id=<?=$schedule['id']?>"
                                            class="tsl-link">
                                            <div class="time"><?php echo date("H:i", $schedule['airingAt']);?></div>
                                            <div class="film-detail">
                                                <h3 class="film-name dynamic-name" data-jname="<?=$title['romaji']?>">
                                                    <?=$title['romaji']?></h3>
                                                <div class="fd-play">
                                                    <button type="button" class="btn btn-sm btn-play"><i
                                                            class="fas fa-play mr-2"></i> Episode
                                                        <?=$schedule['episode']?>
                                                    </button>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <?php } ?>
                                    <?php } ?>



                                </ul>

                            </div>
                        </div>
                    </section>
                </div>