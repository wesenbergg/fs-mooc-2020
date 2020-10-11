import React from 'react';
import {
  Alert,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { useHistory } from 'react-router-native';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import { DELETE_REVIEW } from '../graphql/mutations';

import Text from './Text';
import theme from '../theme';
import { styles as repoStyles } from '../repositoryItemStyles.js';
import { useMutation } from '@apollo/react-hooks';
const blue = theme.colors.google;
const styles = StyleSheet.create(repoStyles);

const ReviewItem = ({ review, refetch }) => {
  const history = useHistory();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = async ({ id }) => {
    const { data } = await deleteReview({ variables: { id } });
    if (data.deleteReview) refetch();
  };

  const deleteAlert = (review) => {
    return Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => handleDelete(review) },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={{ backgroundColor: 'white', padding: 15, paddingBottom: 30 }}>
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>

        <View style={{ flexGrow: 1, flexShrink: 1 }}>
          <Text style={styles.nameText}>{review.repository.fullName}</Text>
          <Text style={styles.dateText}>{review.createdAt.slice(0, 10)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 15,
          justifyContent: 'space-between',
        }}
      >
        <View style={styles.buttonContainer}>
          <Text
            onPress={() => history.push(`/repo/${review.repositoryId}`)}
            style={styles.primaryButtonText}
          >
            View review
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text
            onPress={() => deleteAlert(review)}
            style={styles.warningButtonText}
          >
            Delete review
          </Text>
        </View>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { authorizedUser, fetchMore, refetch } = useAuthorizedUser({
    first: 4,
    includeReviews: true,
  });

  const onEndReach = () => {
    fetchMore();
  };

  const reviews =
    authorizedUser && authorizedUser.reviews
      ? authorizedUser.reviews.edges.map((edge) => edge.node)
      : [];

  if (reviews.length <= 0) return null;

  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem review={item} refetch={refetch} />
        )}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={
          Platform.OS !== 'android' &&
          (({ highlighted }) => (
            <View
              style={[styles.separator, highlighted && { marginLeft: 0 }]}
            />
          ))
        }
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
};

export default MyReviews;
