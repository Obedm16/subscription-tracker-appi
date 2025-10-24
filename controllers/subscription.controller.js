import { workflowClient } from '../config/upstash.js';
import Subscription from '../models/subscription.model.js';
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id
    });

    await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: { subscriptionId: subscription._id }
    });

      res.status(201).json({success: true, message: "Subscription created successfully",
        data: subscription,
      });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if(req.user.id !== req.params.id){
      const error = new Error("Not account owner");
      error.statusCode = 401;
      throw error;
    }
    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({
      success: true,
      message: "User subscriptions retrieved successfully",
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};