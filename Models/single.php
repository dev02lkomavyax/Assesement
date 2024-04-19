<?php
/**
 * Template Name: Single Product
 */

  get_header();
?>
<?php 
   
    while(have_posts()) : the_post();
        $productId = get_the_Id();
        $product_title = get_the_title();
        $product_content = get_the_content();
        $product_price = get_field("product_price");
        $product_image = get_field("product_img")['url'];
        $productCategory = get_field("product_category");

        $product = wc_get_product($productId);
        $salePrice = $product->get_sale_price();
        $regularPrice = $product->get_regular_price();

        $attributes = $product->get_attributes();
        if (!empty($attributes)) {
            foreach ($attributes as $attribute) {
                // Get the attribute name
                $attribute_name = wc_attribute_label($attribute->get_name());
        
                // Get the attribute terms
                $attribute_terms = $attribute->get_terms();
        
                // Initialize an array to store the term names
                $sizes = array();
        
                // Loop through the terms and extract their names
                foreach ($attribute_terms as $term) {
                    $sizes[] = $term->name; // Assuming 'name' is the property containing the term name
                }
        
                // Apply wc_attribute_label() to each term name
                $sizes = array_map('wc_attribute_label', $sizes);
            }
        }
        
    ?>

        <div class="single-product-top">
            <div class="images-img-container-wrapper">
                <div class="images">
                    <?php
                    // Get the product gallery
                    $gallery_images = $product->get_gallery_image_ids();

                    if ($gallery_images) {
                        
                        // Loop through each gallery image
                        foreach ($gallery_images as $gallery_image_id) {
                            // Get the image URL
                            $gallery_image_url = wp_get_attachment_url($gallery_image_id);
                            
                            // Output the image tag
                            echo '<img src="' . esc_url($gallery_image_url) . '" alt="image" class="gallery-image';
                            if ($gallery_images[0] == $gallery_image_id) {
                                echo ' active-image';
                            }
                            echo '">';

                        }
                        
                    }
                    ?>
                </div>
                <div class="img-container">
                    <img id="selected-image" src="<?php echo wp_get_attachment_url($gallery_images[0]) ?>" alt="<?php echo get_field("product_name")?>">
                </div>
            </div>

            <div class="single-product-info">
                <div class="heading-container">
                    <h1><?php echo $product_title?></h1>
                    <form action="" method="post">
                        <input type="hidden" name="product_id" value="<?php echo esc_attr( $productId ); ?>">
                        <button class="btn btn-no-gray" type="submit" name="add_to_wishlist">
                            <span class="material-icons">favorite</span>
                        </button>
                    </form>
                </div>
                <div class="price-box">
                    <p class="offer-price">₹<?php echo $salePrice; ?></p>
                    <p class="main-price">₹<?php echo $regularPrice; ?></p>
                </div>
                <div class="rating-cotainer">
                    <div class="rating">
                        <span class="material-icons orange">star</span>
                        <span class="material-icons orange">star</span>
                        <span class="material-icons orange">star</span>
                        <span class="material-icons orange">star</span>
                        <span class="material-icons orange">star</span>
                    </div>
                    <span>(3 customer reviews)</span>
                </div>

                <?php

                ?>
                <div class="select-wrapper">
                    <label for="sizeSelect">Select Size:</label>
                    <select name="select" id="select">
                        <option value="">Select Size</option>
                        <?php foreach ($sizes as $size) : ?>
                        <option value="<?php echo esc_attr(strtolower($size)); ?>"><?php echo esc_html($size); ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <p><?php echo $product_content ?></p>
                <div class="btn-container">
                    <!-- <button class="btn btn-gray">
                        <span>-</span>
                        <span class="qty">1</span>
                        <span>+</span>
                    </button> -->
                    <div class="quantity btn btn-gray">
                        <button class="decrease">-</button>
                        <input type="number" class="qty" name="quantity" value="1" min="1">
                        <button class="increase">+</button>
                    </div>

                    <button data-productid="<?php echo $productId ?>" class="btn btn-orange btn-add-to-cart">Add To Cart</button>
                </div>
                <div class="btn-container">
                    <!-- <button class="btn btn-no-gray btn-add-to-wishlist">
                        <span>Add To Whishlist</span>
                        <span class="material-icons">favorite</span>
                    </button> -->
                    <button class="btn btn-share">
                        Share
                        <span class="material-icons">share</span>
                    </button>
                </div>
                <div class="categories">
                    <h3>Categories</h3>
                    <div>
                        <a href="">All product, </a>
                        <a href="">cake, </a>
                        <a href="">donuts, </a>
                        <a href="">sandwiche </a>
                    </div>
                </div>
            </div>
        </div>
    <?php
    endwhile;
    // endif;
    ?>



<div class="single-product-bottom">
    <ul class="single-product-bottom-header">
        <li>Description</li>
        <li>Additional information</li>
        <li>Reviews(3)</li>
    </ul>
    <div class="info-container">
        <h2>Game Console Controller Cable</h2>
        <p>Hills Science Plan Healthy Development Puppy Food Large Breed with Chicken is specifically formulated to meet the nutritional needs of your large breed puppy to help support its growth and development.</p>
        <p>Made from high quality ingredients including a minimum of 34% chicken, Hills Science Plan Canine Puppy Large Breed is infused with:</p>
        <ul>
            <li>Controlled Fat and Calories – to help large breed puppies grow at the proper rate;</li>
            <li>Controlled Calcium – for healthy joint and bone development;</li>
            <li>L-carnitine – a special nutrient shown to enhance bone and muscle strength;</li>
            <li>High Quality Protein – to support healthy growth and strong muscles</li>
            <li>Minerals – provides the optimum amount for growth and development;</li>
            <li>With added calcium to help keep bones and teeth strong;</li>
            <li>Natural Fibre – for a healthy digestive system;</li>
            <li>Omega 3 and 6 Fatty Acids – for a shiny, healthy coat;</li>
            <li>Anti-oxidants – boosts your puppys immune system, reduces cell damage and aids growth.</li>
        </ul>

        <hr>

        <p>The crunchy kibble will help aid your puppys dental health through the natural crunching process, promoting dental care from a young age.</p>
        <ul>
            <li>Suitable for puppies from weaning up to 1 year old whose adult body weight will exceed 25kg.</li>
            <li>Hills Science Plan Canine Puppy Large Breed is part of the Pets at Home Nutrition Centre.</li>
            <li>Approximate Dimensions (Product): 42 x 15 x 20cm</li>
        </ul>
    </div>
</div>

    <div class="related-products">
        <h2 class="h2">Related Products</h2>
        <p>Sitewide Discounts Savings Of Up To 25%</p>
        <div class="related-products-container">
            <?php 
            $products = new WP_Query(array(
                'post_type' => 'product',
                'posts_per_page' => 4,
                'meta_query' => array(
                    array(
                        'key' => 'product_category',
                        'value' => $productCategory,
                        'compare' => 'LIKE',
                    )
                )
            ));

            while($products->have_posts()) {
                $products->the_post();
                $product_id = get_the_id();
                $product = wc_get_product( get_the_ID() );
                ?>
                <a href="<?php the_permalink(); ?>" class="trending-items-card">
                    <div class="like">
                        <i class="fas fa-regular fa-heart"></i>
                    </div>
                    <img src="<?php echo get_field("product_img")['url'] ?>" alt="product">
                    <!-- <div class="rating">
                        <span class="material-icons orange">star</span>
                        <span class="material-icons orange">star</span>
                        <span class="material-icons orange">star</span>
                        <span class="material-icons orange">star</span>
                        <span class="material-icons orange">star</span>
                    </div> -->
                    <div class="trending-items-card-bottom">
                        <div class="trending-items-card-bottom-left">
                            <h2><?php echo get_the_title() ?></h2>
                            <div class="price-box">
                                <p class="offer-price">₹<?php echo $product->get_sale_price(); ?></p>
                                <p class="main-price">₹<?php echo $product->get_regular_price(); ?></p>
                            </div>
                        </div>
                        <div class="offer">40% off</div>
                    </div>
                </a>
            <?php }
            ?>
        </div>
    </div>

<div class="news-letter-wrapper">
    <div class="news-letter">
        <div class="news-letter-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="49.506" height="49.506" viewBox="0 0 49.506 49.506"><path d="M37.9,49.506H11.6A11.616,11.616,0,0,1,0,37.9v-11.6a5.346,5.346,0,0,1,1.672-3.918,5.479,5.479,0,0,1,4.038-1.5,5.386,5.386,0,0,1,2.938,1.07l11.4,8.544.013.01a7.754,7.754,0,0,0,9.382,0l.013-.01,11.4-8.54A5.391,5.391,0,0,1,43.8,20.893a5.48,5.48,0,0,1,4.037,1.5,5.346,5.346,0,0,1,1.672,3.918V37.9A11.616,11.616,0,0,1,37.9,49.506ZM5.431,24.753a1.621,1.621,0,0,0-1.1.441,1.491,1.491,0,0,0-.467,1.112V37.9A7.744,7.744,0,0,0,11.6,45.638H37.9A7.744,7.744,0,0,0,45.638,37.9v-11.6a1.491,1.491,0,0,0-.467-1.112A1.612,1.612,0,0,0,44,24.755a1.509,1.509,0,0,0-.832.31L31.783,33.6a11.631,11.631,0,0,1-14.06,0L6.333,25.061a1.5,1.5,0,0,0-.9-.308Zm24.157-3.868a1.934,1.934,0,0,0-1.934-1.934H17.211a1.934,1.934,0,0,0,0,3.868H27.654A1.934,1.934,0,0,0,29.587,20.885Zm4.835-7.445a1.934,1.934,0,0,0-1.934-1.934H17.211a1.934,1.934,0,0,0,0,3.868H32.488A1.934,1.934,0,0,0,34.422,13.44Zm10.443,1.74V11.6A11.616,11.616,0,0,0,33.262,0H16.437a11.616,11.616,0,0,0-11.6,11.6v3.578a1.934,1.934,0,1,0,3.868,0V11.6a7.744,7.744,0,0,1,7.735-7.735H33.262A7.744,7.744,0,0,1,41,11.6v3.578a1.934,1.934,0,1,0,3.868,0Z" fill="#fff"></path></svg>
            <h2>GET $20 OFF YOUR <br> FIRST ORDER?</h2>
            <p>Join our mailing list!</p>
            <div class="input-box">
                <input type="text" placeholder="Enter Your Email Address">
                <button class="btn">Shop Now</button>
            </div>
        </div>
    </div>
    <div class="feature-container">
        <div class="feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><g transform="translate(0)"><path d="M42.187,25a1.953,1.953,0,0,1-1.953,1.953H18.511a50.6,50.6,0,0,0,2.4,12.31,1.953,1.953,0,1,1-3.729,1.162A54.107,54.107,0,0,1,14.6,26.953H9.766a1.953,1.953,0,0,1,0-3.906H14.6A53.857,53.857,0,0,1,17.194,9.572a1.953,1.953,0,1,1,3.727,1.168,50.359,50.359,0,0,0-2.411,12.307H31.494a48.772,48.772,0,0,0-2.3-12.307,1.953,1.953,0,1,1,3.727-1.168,52.467,52.467,0,0,1,2.487,13.475h4.829A1.953,1.953,0,0,1,42.187,25Zm.49-17.678A25,25,0,0,0,7.322,42.678,24.837,24.837,0,0,0,25,50c.357,0,.718-.008,1.074-.023a1.953,1.953,0,0,0-.165-3.9c-.3.013-.607.019-.909.019A21.094,21.094,0,1,1,46.094,25,1.953,1.953,0,0,0,50,25,24.837,24.837,0,0,0,42.678,7.322Z"></path><path d="M330.96,312.571a1.953,1.953,0,0,0-2.762,0l-2.98,2.98-9.238-1.76a1.953,1.953,0,0,0-1.185,3.692l5.808,2.683-4.4,4.4-.865-.865a1.953,1.953,0,0,0-2.762,2.762l4.492,4.492a1.953,1.953,0,0,0,2.762-2.762l-.865-.865,4.4-4.4,2.683,5.808a1.953,1.953,0,0,0,3.692-1.185l-1.76-9.238,2.98-2.98a1.953,1.953,0,0,0,0-2.762Z" transform="translate(-281.532 -281.53)"></path></g></svg>
            <div class="feature-right">
                <h3>Free Shipping</h3>
                <p>Capped at $39 per order</p>
            </div>
        </div>
        <div class="feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><g transform="translate(0)"><path d="M42.187,25a1.953,1.953,0,0,1-1.953,1.953H18.511a50.6,50.6,0,0,0,2.4,12.31,1.953,1.953,0,1,1-3.729,1.162A54.107,54.107,0,0,1,14.6,26.953H9.766a1.953,1.953,0,0,1,0-3.906H14.6A53.857,53.857,0,0,1,17.194,9.572a1.953,1.953,0,1,1,3.727,1.168,50.359,50.359,0,0,0-2.411,12.307H31.494a48.772,48.772,0,0,0-2.3-12.307,1.953,1.953,0,1,1,3.727-1.168,52.467,52.467,0,0,1,2.487,13.475h4.829A1.953,1.953,0,0,1,42.187,25Zm.49-17.678A25,25,0,0,0,7.322,42.678,24.837,24.837,0,0,0,25,50c.357,0,.718-.008,1.074-.023a1.953,1.953,0,0,0-.165-3.9c-.3.013-.607.019-.909.019A21.094,21.094,0,1,1,46.094,25,1.953,1.953,0,0,0,50,25,24.837,24.837,0,0,0,42.678,7.322Z"></path><path d="M330.96,312.571a1.953,1.953,0,0,0-2.762,0l-2.98,2.98-9.238-1.76a1.953,1.953,0,0,0-1.185,3.692l5.808,2.683-4.4,4.4-.865-.865a1.953,1.953,0,0,0-2.762,2.762l4.492,4.492a1.953,1.953,0,0,0,2.762-2.762l-.865-.865,4.4-4.4,2.683,5.808a1.953,1.953,0,0,0,3.692-1.185l-1.76-9.238,2.98-2.98a1.953,1.953,0,0,0,0-2.762Z" transform="translate(-281.532 -281.53)"></path></g></svg>
            <div class="feature-right">
                <h3>Free Shipping</h3>
                <p>Capped at $39 per order</p>
            </div>
        </div>
        <div class="feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><g transform="translate(0)"><path d="M42.187,25a1.953,1.953,0,0,1-1.953,1.953H18.511a50.6,50.6,0,0,0,2.4,12.31,1.953,1.953,0,1,1-3.729,1.162A54.107,54.107,0,0,1,14.6,26.953H9.766a1.953,1.953,0,0,1,0-3.906H14.6A53.857,53.857,0,0,1,17.194,9.572a1.953,1.953,0,1,1,3.727,1.168,50.359,50.359,0,0,0-2.411,12.307H31.494a48.772,48.772,0,0,0-2.3-12.307,1.953,1.953,0,1,1,3.727-1.168,52.467,52.467,0,0,1,2.487,13.475h4.829A1.953,1.953,0,0,1,42.187,25Zm.49-17.678A25,25,0,0,0,7.322,42.678,24.837,24.837,0,0,0,25,50c.357,0,.718-.008,1.074-.023a1.953,1.953,0,0,0-.165-3.9c-.3.013-.607.019-.909.019A21.094,21.094,0,1,1,46.094,25,1.953,1.953,0,0,0,50,25,24.837,24.837,0,0,0,42.678,7.322Z"></path><path d="M330.96,312.571a1.953,1.953,0,0,0-2.762,0l-2.98,2.98-9.238-1.76a1.953,1.953,0,0,0-1.185,3.692l5.808,2.683-4.4,4.4-.865-.865a1.953,1.953,0,0,0-2.762,2.762l4.492,4.492a1.953,1.953,0,0,0,2.762-2.762l-.865-.865,4.4-4.4,2.683,5.808a1.953,1.953,0,0,0,3.692-1.185l-1.76-9.238,2.98-2.98a1.953,1.953,0,0,0,0-2.762Z" transform="translate(-281.532 -281.53)"></path></g></svg>
            <div class="feature-right">
                <h3>Free Shipping</h3>
                <p>Capped at $39 per order</p>
            </div>
        </div>
        <div class="feature">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><g transform="translate(0)"><path d="M42.187,25a1.953,1.953,0,0,1-1.953,1.953H18.511a50.6,50.6,0,0,0,2.4,12.31,1.953,1.953,0,1,1-3.729,1.162A54.107,54.107,0,0,1,14.6,26.953H9.766a1.953,1.953,0,0,1,0-3.906H14.6A53.857,53.857,0,0,1,17.194,9.572a1.953,1.953,0,1,1,3.727,1.168,50.359,50.359,0,0,0-2.411,12.307H31.494a48.772,48.772,0,0,0-2.3-12.307,1.953,1.953,0,1,1,3.727-1.168,52.467,52.467,0,0,1,2.487,13.475h4.829A1.953,1.953,0,0,1,42.187,25Zm.49-17.678A25,25,0,0,0,7.322,42.678,24.837,24.837,0,0,0,25,50c.357,0,.718-.008,1.074-.023a1.953,1.953,0,0,0-.165-3.9c-.3.013-.607.019-.909.019A21.094,21.094,0,1,1,46.094,25,1.953,1.953,0,0,0,50,25,24.837,24.837,0,0,0,42.678,7.322Z"></path><path d="M330.96,312.571a1.953,1.953,0,0,0-2.762,0l-2.98,2.98-9.238-1.76a1.953,1.953,0,0,0-1.185,3.692l5.808,2.683-4.4,4.4-.865-.865a1.953,1.953,0,0,0-2.762,2.762l4.492,4.492a1.953,1.953,0,0,0,2.762-2.762l-.865-.865,4.4-4.4,2.683,5.808a1.953,1.953,0,0,0,3.692-1.185l-1.76-9.238,2.98-2.98a1.953,1.953,0,0,0,0-2.762Z" transform="translate(-281.532 -281.53)"></path></g></svg>
            <div class="feature-right">
                <h3>Free Shipping</h3>
                <p>Capped at $39 per order</p>
            </div>
        </div>
    </div>
</div>

<?php
  get_footer();
?>